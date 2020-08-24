//hiệu chỉnh cho phù hợp với Vue
function RoundToSpec(MyNum, RoundTo){
	//rounds given number to next highest RoundTo number
	//used to calc the next highest IOL power to Plano
	var Divis = MyNum / RoundTo;
	var TheAns;
	
	TheAns = (Math.ceil(Divis))*RoundTo;
	//alert("Divis is " + Divis);
	//alert("Ceil is " + Math.ceil(Divis));
	//alert("TheAns is " + TheAns);
	return TheAns;
}   

function HaigisIOL(K1, K2, AL, Aconst, ACDmeas, REF, a2, a1, a0){

    //IOL calc according to Haigis (GOOGLE this for ref; Warren Hill's spreadsheet)
    var RC; //radius of curvature for cornea (converted from K//s)
    var nC; //fudged index of refr for cornea
    var n; //index of refraction for aqueous and vitreous
    var meanACD;
    var meanAL;
    var d; //optical ACD
    var Vertex; //vertex distance for refraction
    var DC; //refractive corneal power
    var z;
    var ACDconst;

	var R1 = 337.5 / K1;
	var R2 = 337.5/ K2;	
    RC = (R1 + R2)/2; // Radius of Curvature	
	
    nC = 1.3315;
    n = 1.336 * 1000;
    meanACD = 3.37;
    meanAL = 23.39;
    Vertex = 12.5 / 1000;
    ACDconst = 0.62467 * Aconst - 68.747; //calculate ACD constant from A constant

    //if a0 is null (not entered) then use calculated value
    //if(!a0){
        //a1 = 0.4;
        //a2 = 0.1;
        //a0 = ACDconst - a1 * meanACD - a2 * meanAL;
    //}
    
    d = a0 + a1 * ACDmeas + a2 * AL;

    DC = (1000 * (nC - 1)) / RC;
    z = DC + (REF / (1 - REF * Vertex));

    return ((n / (AL - d)) - (n / ((n / z) - d)));
}

function HaigisRx(K1, K2, AL, Aconst, ACDmeas, IOL, a2, a1, a0){

    //calculate Rx, given IOL
    var RC; //radius of curvature for cornea (converted from Ks)
    var nC; //fudged index of refr for cornea
    var n; //index of refraction for aqueous and vitreous
    var meanACD;
    var meanAL;
    var d; //optical ACD
    var Vertex; //vertex distance for refraction
    var DC; //refractive corneal power
    var ACDconst;
    
    var qTOP;
    var qBOTTOM;
    var q;
    var RxTOP;
    var RxBOTTOM;
    var dBC;
        
    var R1 = 337.5 / K1;
	var R2 = 337.5/ K2;	
    RC = (R1 + R2)/2; // Radius of Curvature	
	
    nC = 1.3315;
    n = 1.336 * 1000;
    meanACD = 3.37;
    meanAL = 23.39;
    Vertex = 12.5 / 1000;
    ACDconst = 0.62467 * Aconst - 68.747; //calculate ACD constant from A constant
    dBC = 12.5 / 1000;

   //if a0 is null (not entered) then use calculated value
    //if(!a0){
        //a1 = 0.4;
        //a2 = 0.1;
        //a0 = ACDconst - a1 * meanACD - a2 * meanAL;
    //}

    d = a0 + a1 * ACDmeas + a2 * AL;

    DC = (1000 * (nC - 1)) / RC;
       
    qTOP = n * (n - IOL * (AL - d));
    qBOTTOM = n * (AL - d) + d * (n - IOL * (AL - d));
    q = qTOP / qBOTTOM;
    
    RxTOP = q - DC;
    RxBOTTOM = 1 + dBC * (q - DC);

    return (RxTOP / RxBOTTOM);
}

function SRK_T(K1, K2, AL, ACONACD, IOL){
         //return Rx from a given IOL
         //revised 7/16/00
         //JCatRefrSurg May 1990, p.333-40

	var Na;   //refractive index aqueous
	var NC;   //refractive index cornea
	var R;  //cornea radius of curvature
	var R1;
	var R2;
	var RETHICK;   //retinal thickness
	var ACDSRK;   //ACD constant for SRK formula
	var LCOR;   //axial length with long eye correction
	var Cw;   //corneal width
	var H;   //corneal dome height
	var ACD;   //computed postop ACD
	var NCM1;   //NC minus 1
	var top;   //numerator of big equation
	var bottom;   //denominator of big equation
	var Offset;   //difference between IOL vs. natural lens to cornea
	var LOPT;   //optical axial length
	var V;  //vertex distance
	var TestForNeg;
	var Kav;

	Na = 1.336;
	NC = 1.333;
	
	//need to average Ks AFTER conversion to Radius of Curvature!!
	R1 = 337.5 / K1;
	R2 = 337.5 / K2;
	R = (R1 + R2) / 2;
	Kav = 337.5 / R;
	
	V = 12; //vertex distance

	RETHICK = 0.65696 - 0.02029 * AL;
	LOPT = AL + RETHICK;
	NCM1 = NC - 1;

	if(ACONACD > 100){
			   ACDSRK = ACONACD * 0.62467 - 68 - 0.74709;
	}
	else ACDSRK = ACONACD;

	Offset = ACDSRK - 3.3357;

	if(AL <= 24.2){
		  LCOR = AL;
	}
	else LCOR = -3.446 + 1.716 * AL - 0.0237 * AL * AL;

	Cw = -5.40948 + 0.58412 * LCOR + 0.098 * Kav;

	TestForNeg = R * R - ((Cw * Cw) / 4);

	if(TestForNeg < 0){
		 TestForNeg = 0;
	}
	//NOTE square root "SQRT" in Excel is the "Sqr" equivalent in VBA!!
	H = R - Math.sqrt(TestForNeg);

	if(H > 5.5){
		 H = 5.5;
	}

	ACD = H + Offset;

	top = 1000 * Na * (Na * R - NCM1 * LOPT) - IOL * (LOPT - ACD) * (Na * R - NCM1 * ACD);
	bottom = (Na * (V * (Na * R - NCM1 * LOPT) + LOPT * R) - 0.001 * IOL * (LOPT - ACD) * (V * (Na * R - NCM1 * ACD) + ACD * R));

	return (top / bottom);
}

function SRKtIOL(K1, K2, AL, ACONACD, REFTG){
         //revised 7/16/00
         //return IOL from a given Rx
         //JCatRefrSurg May 1990, p.333-40
	var Na; //refractive index aqueous
	var NC; //refractive index cornea
	var R1; //cornea radius of curvature
	var R2;
	var R;
	var RETHICK; //retinal thickness
	var ACDSRK; //ACD constant for SRK formula
	var LCOR; //axial length with long eye correction
	var Cw; //corneal width
	var H; //corneal dome height
	var ACD; //computed postop ACD
	var NCM1; //NC minus 1
	var top; //numerator of big equation
	var bottom; //denominator of big equation
	var Offset; //difference between IOL vs. natural lens to cornea
	var LOPT; //optical axial length
	var V; //vertex distance
	var TestForNeg;
	var Kav;

	Na = 1.336;
	NC = 1.333;
	
	//need to average Ks AFTER conversion of each to Radius of cuvature!!
	R1 = 337.5 / K1;
	R2 = 337.5 / K2;
	R = (R1 + R2) / 2;
	Kav = 337.5 / R;
	
	V = 12; //vertex distance

	RETHICK = 0.65696 - 0.02029 * AL;
	LOPT = AL + RETHICK;
	NCM1 = NC - 1;

	if(ACONACD > 100){
			   ACDSRK = ACONACD * 0.62467 - 68 - 0.74709;
	}

	if(ACONACD <= 100){
			   ACDSRK = ACONACD;
	} 

	Offset = ACDSRK - 3.3357;

	if(AL <= 24.2){
		  LCOR = AL;
		  }
	else LCOR = -3.446 + 1.716 * AL - 0.0237 * AL * AL;

	Cw = -5.40948 + 0.58412 * LCOR + 0.098 * Kav;

	TestForNeg = R * R - ((Cw * Cw) / 4);

	if(TestForNeg < 0){
		  TestForNeg = 0;
	}
	//NOTE square root "SQRT" in Excel is the "Sqr" equivalent in VBA!!
	H = R - Math.sqrt(TestForNeg);

	if(H > 5.5){
		 H = 5.5;
	}
	
	ACD = H + Offset;

	top = 1000 * Na * (Na * R - NCM1 * LOPT - 0.001 * REFTG * (V * (Na * R - NCM1 * LOPT) + LOPT * R));
	bottom = (LOPT - ACD) * (Na * R - NCM1 * ACD - 0.001 * REFTG * (V * (Na * R - NCM1 * ACD) + ACD * R));

	return (top / bottom);
}

function HofferQiol(K1, K2, A, pACD, Rx){
	//return IOL from a given Rx
	//revised 9/24/02  	

	var ACD;
	var MyPi;
	var M;
	var G;
	var R;
	var Ax;
	var Ax = A; //store measured axial length prior to modification
	  
	//need to average Ks AFTER conversion of each to Radius of cuvature!!
	var R1 = 337.5 / K1;
	var R2 = 337.5 / K2;
	var R = (R1 + R2) / 2;
	var K = 337.5 / R;

	//MyPi = 3.14159265358979;
	var MyPi = Math.PI;
	R = Rx / (1 - 0.012 * Rx); //adjust for vertex distance of 12mm

	if(A <= 23){
		M = 1;
		G = 28;
		}
	else
		{
		M = -1;
		G = 23.5;
		}

	if(A > 31){
		A = 31;
	    }
	  
	if (A < 18.5){
		A = 18.5;
	    }

	ACD = pACD + 0.3 * (A - 23.5) + (Math.tan(K * MyPi / 180))*(Math.tan(K * MyPi / 180)) + (0.1 * M * ((23.5 - A)*(23.5 - A)) * (Math.tan(0.1 * ((G - A)*(G - A)) * MyPi / 180))) - 0.99166;

	var ans =  ((1336 / (Ax - ACD - 0.05)) - (1.336 / ((1.336 / (K + R)) - ((ACD + 0.05) / 1000))));
	return ans;
}

function HoffQ(K1, K2, A, pACD, P){
    //return Rx from a given IOL
    //revised 9/24/02

    var ACD;
	var MyPi ;
	var CornealPlaneRx;
	var M;
	var G;
	var Ax; //axial length before modification
	
	//need to average Ks AFTER conversion of each to Radius of cuvature!!
	var R1 = 337.5 / K1;
	var R2 = 337.5 / K2;
	var R = (R1 + R2) / 2;
	var K = 337.5 / R;	  	  

    Ax = A; //store measured axial length prior to modification

    //MyPi = 3.14159265358979;
    MyPi = Math.PI;

    if(A <= 23){
		M = 1;
		G = 28;
    }
    else {
	   M = -1;
	   G = 23.5;
    }

    if(A > 31){
		A = 31;
    }
    if(A < 18.5){
		A = 18.5;
    }

    ACD = pACD + 0.3 * (A - 23.5) + (Math.tan(K * MyPi / 180))*(Math.tan(K * MyPi / 180)) + (0.1 * M * ((23.5 - A)*(23.5 - A)) * (Math.tan(0.1 * ((G - A)*(G - A)) * MyPi / 180))) - 0.99166;

    CornealPlaneRx = (1.336 / (1.336 / (1336 / (Ax - ACD - 0.05) - P) + (ACD + 0.05) / 1000)) - K;

    return (CornealPlaneRx / (1 + 0.012 * CornealPlaneRx));
}

function HolladayIOL(K1, K2, AL, SF, REF){
	//return IOL for a given target Rx
	//J Cat Refr Surg Jan 1988 p. 24

	var Rag;
	var AG;
	var Alm;
	var NcTerm;
	var Na;
	var V; //vertex distance (initialize the variable!!)
	var ACD;
	var R;
	var top;
	var bottom;
	
	//need to average Ks AFTER conversion of each to Radius of cuvature!!
	var R1 = 337.5 / K1;
	var R2 = 337.5 / K2;
	var R = (R1 + R2) / 2;
	var K = 337.5 / R;	 

	Alm = 0.2 + AL;
	NcTerm = (4 / 3) - 1;
	Na = 1.336;
	V = 12;
	R = 337.5 / K;

	if(R < 7) Rag = 7;
	else Rag = R;
	
	if((12.5 * AL / 23.45) > 13.5) AG = 13.5;
	else AG = (12.5 * AL / 23.45);

	//calculates ACD value 
	ACD = 0.56 + Rag - (Math.sqrt(Rag * Rag - (AG * AG / 4)));

	top = 1000 * Na * (Na * R - NcTerm * Alm - 0.001 * REF * (V * (Na * R - NcTerm * Alm) + Alm * R));
	bottom = (Alm - ACD - SF) * (Na * R - NcTerm * (ACD + SF) - 0.001 * REF * (V * (Na * R - NcTerm * (ACD + SF)) + (ACD + SF) * R));

	return (top/bottom);
	}

function Holl(K1, K2, AL, SF, I){ 
	//return Rx from a given IOL
	//J Cat Refr Surg Jan 1988 p. 24
	//revised 7/16/00

	var Rag; 
	var AG;  
	var Alm;  
	var NcTerm;  
	var Na;  
	var V;
	var ACD;
	var R;
	var top;
	var bottom;
		
	//need to average Ks AFTER conversion of each to Radius of cuvature!!
	var R1 = 337.5 / K1;
	var R2 = 337.5 / K2;
	var R = (R1 + R2) / 2;
	var K = 337.5 / R;	 	

	Alm = 0.2 + AL;
	NcTerm = (4 / 3) - 1;
	Na = 1.336;
	V = 12;
	R = 337.5 / K;

	if(R < 7) Rag = 7;
	else Rag = R;

	if((12.5 * AL / 23.45) > 13.5) AG = 13.5;
	else AG = (12.5 * AL / 23.45);

	//calculates ACD value
	ACD = 0.56 + Rag - (Math.sqrt(Rag * Rag - (AG * AG / 4)));

	top = 1000 * Na * (Na * R - NcTerm * Alm) - I * (Alm - ACD - SF) * (Na * R - NcTerm * (ACD + SF));
	bottom = Na * (V * (Na * R - NcTerm * Alm) + Alm * R) - 0.001 * I * (Alm - ACD - SF) * (V * (Na * R - NcTerm * (ACD + SF)) + (ACD + SF) * R);

	return (top / bottom);
	}
