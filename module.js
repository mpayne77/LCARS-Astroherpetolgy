var today = new Date();
var lightStatus = false;
 
var topFrame1 = LCARS.create({type: 'bar', color:'bg-orange-3', label:'LCARS', id: 'topFrame1'});

var topFrame2 = LCARS.create({type: 'elbow', color:'bg-orange-3', label:'ACCESS', id: 'topFrame2'});

var topFrame3 = LCARS.create({type: 'bar', color:'bg-orange-4', id: 'topFrame3'});

var topFrame4 = LCARS.create({type: 'bar', color:'bg-orange-3', label: 'STARDATE:', id: 'topFrame4'});

var topFrame5 = LCARS.create({type: 'bar', color:'bg-orange-4', id: 'stardate', label: stardate(), id: 'topFrame5'});

var pageTitle = LCARS.create({type: 'title', color:'bg-orange-3', text: 'ASTROHERPETOLOGY', id: 'pageTitle'});

var bottomFrame1 = LCARS.create({type: 'elbow', color:'bg-orange-3', direction: 'top-left', id: 'bottomFrame1'});

var bottomFrame2 = LCARS.create({type: 'bar', color:'bg-orange-3', id: 'bottomFrame2'});

var bottomFrame3 = LCARS.create({type: 'bar', color:'bg-orange-3', label: 'TIME:', id: 'bottomFrame3'});

var bottomFrame4 = LCARS.create({type: 'bar', color:'bg-orange-3', id: 'startime', label: startime(), id: 'bottomFrame4'});

var homeButton = LCARS.create({type: 'button', color:'bg-purple-5', label:'HOME', id: 'homeButton'});

var timerAdjustButton = LCARS.create({type: 'button', color:'bg-purple-4', label:'TIMER\nADJUST', id: 'timerAdjustButton'});

var timerOverrideButton = LCARS.create({type: 'button', color:'bg-orange-4', label:'TIMER\nOVERRIDE', id: 'timerOverrideButton'});

var turtlePicture = LCARS.create({type: 'img', src: 'tortoise.png', id: 'turtlePicture',});

var pictureBracket = LCARS.create({type: 'defaultBracket', namespace: 'sdk', id:'pictureBracket',
coloring: {
    elbow: 'bg-orange-5',
    column1: ['bg-orange-4', 'bg-orange-3', 'bg-orange-4'],
    column2: ['bg-purple-5', 'bg-purple-4', 'bg-purple-5'],
    column3: ['bg-purple-5', 'bg-purple-4', 'bg-purple-5'],
    column4: ['bg-orange-4', 'bg-green-2', 'bg-orange-4'],
    animated: 'bg-red-4'                                          
  },
});

var tempLightStatus = LCARS.create({type:'complexButton', id: 'tempLightStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-3', label: 'TEMP\n(LIGHT)', id: 'tempLightButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '35', id: 'tempLightText'}, 
  {type: 'cap', version: 'round-right', color: 'bg-purple-3', id: 'tempLightCap'}
]});

var rhLightStatus = LCARS.create({type:'complexButton', id: 'rhLightStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-4', label: 'RH\n(LIGHT)', id: 'rhLightButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '60', id: 'rhShadeText'}, 
  {type: 'cap', version: 'round-right', color: 'bg-purple-4', id: 'rhLightCap'}
]});

var tempShadeStatus = LCARS.create({type:'complexButton', id: 'tempShadeStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-3', label: 'TEMP\n(SHADE)', id: 'tempShadeButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '21', id: 'tempShadeText'}, 
  {type: 'cap', version: 'round-right', color: 'bg-purple-3', id: 'tempShadeCap'}
]});

var rhShadeStatus = LCARS.create({type:'complexButton', id: 'rhShadeStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-4', label: 'RH\n(SHADE)', id: 'rhShadeButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '52', id: 'rhShadeText'}, 
  {type: 'cap', version: 'round-right', color: 'bg-purple-4', id: 'rhShadeCap'}
]});

var rhSoilStatus = LCARS.create({type:'complexButton', id: 'rhSoilStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-3', label: 'SOIL\nHUMIDITY', id: 'rhSoilButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '21', id: 'rhSoilText'}, 
  {type: 'cap', version: 'round-right', color: 'bg-purple-3', id: 'rhSoilCap'}
]});

var uvLightStatus = LCARS.create({type:'complexButton', id: 'uvLightStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-4', label: 'UV\nINTENSITY', id: 'uvLightButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '21', id: 'uvLightText'}, 
  {type: 'cap', version: 'round-right', color: 'bg-purple-4 ', id: 'uvLightCap'}
]});

var lightPowerToggle = LCARS.create({type: 'button', version: 'round', color: 'bg-red-1', label: '', id: 'lightPowerToggle'});
var lightOverrideText = LCARS.create({type: 'text', color: 'bg-purple-1', text: lightOverrideMessage, id: 'lightOverrideText'});

var timerSet = LCARS.create({type: 'wrapper', id: 'timerSet', children: [
	{type: 'elbow', direction: 'top-left', version: 'vertical', size: 'small', color:'bg-orange-3', id: 'timerFrameTopLeft'},	
	{type: 'elbow', direction: 'bottom-left', version: 'vertical', size: 'small', color:'bg-orange-3', id: 'timerFrameBottomLeft'},	
	{type: 'elbow', direction: 'bottom-right', version: 'vertical', size: 'small', color:'bg-orange-3', id: 'timerFrameBottomRight'},	
  {type: 'elbow', direction: 'top-right', version: 'vertical', size: 'small', color:'bg-orange-3', id: 'timerFrameTopRight'},	
  {type: 'row', flex: 'h', id: 'timerSetScaleTop', children: [
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
  ]},
  {type: 'row', flex: 'h', id: 'timerSetScaleBottom', children: [
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
    {type: 'bar', color: 'bg-purple-1'},
  ]},
]});


$(document).ready( function(){
  $('body').append((topFrame1).dom);
  $('body').append((topFrame2).dom);
  $('body').append((topFrame3).dom);
  $('body').append((topFrame4).dom);
  $('body').append((topFrame5).dom);
  $('body').append((pageTitle).dom);
  $('body').append((bottomFrame1).dom);
  $('body').append((bottomFrame2).dom);
  $('body').append((bottomFrame3).dom);
  $('body').append((bottomFrame4).dom);
  $('body').append((homeButton).dom);
  $('body').append((timerAdjustButton).dom);
  $('body').append((timerOverrideButton).dom);
  $('body').append((turtlePicture).dom);
  $('body').append((pictureBracket).dom);
  $('body').append((tempLightStatus).dom);
  $('body').append((rhLightStatus).dom);
  $('body').append((tempShadeStatus).dom);
  $('body').append((rhShadeStatus).dom);
  $('body').append((rhSoilStatus).dom);
  $('body').append((uvLightStatus).dom);
  $('body').append((lightPowerToggle).dom);
  $('#lightPowerToggle').hide();
  $('body').append((lightOverrideText).dom);
  $('#lightOverrideText').hide();
  $('body').append((timerSet).dom);
  $('#timerSet').hide();
  
  

  $('#homeButton').click(function(){homeButtonClick()});
  $('#timerAdjustButton').click(function(){timerAdjustButtonClick()});
  $('#timerOverrideButton').click(function(){timerOverrideButtonClick()});
  $('#lightPowerToggle').click(function(){lightPowerToggleClick()});
  
  setInterval(updateItems, 1000);

});

function updateItems() {
  bottomFrame4.set('label', startime());

  if (lightStatus) {
    uvLightStatus.set('state', 'blink');
    uvLightStatus.set('colors', ['bg-blue-1', 'bg-grey-1', 'bg-blue-1']);
    tempLightStatus.set('state', 'blink');
    tempLightStatus.set('colors', ['bg-blue-1', 'bg-grey-1', 'bg-blue-1']);
  }
  else {
    uvLightStatus.set('state', null);
    uvLightStatus.set('colors', ['bg-purple-4', 'bg-grey-1', 'bg-purple-4']);
    tempLightStatus.set('state', null);
    tempLightStatus.set('colors', ['bg-purple-3', 'bg-grey-1', 'bg-purple-3']);
  }
}

function homeButtonClick() {
  const beep = document.getElementById('beep2');
  //beep.play();
}

function timerOverrideButtonClick() {
  const beep = document.getElementById('beep1');
  //beep.play();

  if (timerOverrideButton.get('state') == 'red-dark-light') {
    $('#lightPowerToggle').hide();
    $('#lightOverrideText').hide();
    setLightToggleLabel();
    timerOverrideButton.set('state', null);
    timerAdjustButton.set('state', null);    
  } else {
    $('#lightPowerToggle').show();
    $('#lightOverrideText').show();
    setLightToggleLabel();
    timerOverrideButton.set('state', 'red-dark-light');
    timerAdjustButton.set('state', 'disabled');
  }
}

function timerAdjustButtonClick() {
  const beep = document.getElementById('beep1');
  //beep.play();

  if (timerAdjustButton.get('state') == 'red-dark-light') {
    $('#timerSet').hide();
    timerAdjustButton.set('state', null);
    timerOverrideButton.set('state', null);    
  } else {
    $('#timerSet').show();
    timerAdjustButton.set('state', 'red-dark-light');
    timerOverrideButton.set('state', 'disabled');
  }
}

function stardate() {
  var today = new Date;
  var sdYear = today.getUTCFullYear();
  var sdMonth = today.getUTCMonth() + 1;
  var sdDate = today.getUTCDate();
  
  var strSDyear = sdYear.toString();
  var strSDmonth = sdMonth.toString();
  if (sdMonth < 10) {
    strSDmonth = '0' + strSDmonth;
  }
  var strSDdate = sdDate.toString();
  if (sdDate < 10) {
    strSDdate = '0' + strSDdate;
  }

  var sdHours = today.getUTCHours();
  var sdMinutes = today.getUTCMinutes();
  var strSDhours = sdHours.toString();
  if (sdHours < 10) {
    strSDhours = '0' + strSDhours;
  }
  var strSDminutes = sdMinutes.toString();
  if (sdMinutes < 10) {
    strSDminutes = '0' + strSDminutes;
  }

  return strSDyear + '.' + strSDmonth + '.' + strSDdate;
}

function startime() {
  var today = new Date;

  var sdHours = today.getUTCHours();
  var sdMinutes = today.getUTCMinutes();
  var sdSeconds = today.getUTCSeconds();
  var strSDhours = sdHours.toString();
  if (sdHours < 10) {
    strSDhours = '0' + strSDhours;
  }
  var strSDminutes = sdMinutes.toString();
  if (sdMinutes < 10) {
    strSDminutes = '0' + strSDminutes;
  }
  var strSDseconds = sdSeconds.toString();
  if (sdSeconds < 10) {
    strSDseconds = '0' + strSDseconds;
  }

  return strSDhours + ':' + strSDminutes + ':' + strSDseconds;
}

function setLightToggleLabel () {
  if (lightStatus) {
    lightPowerToggle.set('label', 'TURN LIGHT OFF');
  } else {
    lightPowerToggle.set('label', 'TURN LIGHT ON');
  }
}

function lightPowerToggleClick () {
  const beep = document.getElementById('beep4');
  //beep.play();

  if (lightStatus) {
    lightStatus = false;
    setLightToggleLabel();
  } else {
    lightStatus = true;
    setLightToggleLabel();
  }
}