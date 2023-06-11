
ChartIshihara = function()
{
	ChartTypeSingle.call(this, "Ishihara");
}


ChartIshihara.prototype = new ChartTypeSingle();
ChartIshihara.constructor = ChartIshihara;

ChartIshihara.prototype.UpDownMode = function()
{
	return "optotype";
}

ChartIshihara.prototype.GetNumRows = function()
{
	return 1;
}

ChartIshihara.prototype.GetRowScale = function(index)
{
	return this.RowScaleFillHeight() * 1.0;
}

ChartIshihara.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartIshihara.prototype.GetImage = function(index) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	if( index != 0 ) throw new Error("");
	
	return "Ishihara/Plate" + (this.optotypeIndex+1) +".gif";
}

ChartIshihara.prototype.GetNumOptotypes = function()
{
	return 24;
}

ChartIshihara.prototype.GetOptotypeName = function(index)
{
	return "Tấm " + (index + 1);
}

ChartType.Register(new ChartIshihara());

		