var today = new Date();
var lightStatus = false;
var onTime = 0;
var offTime = 1;
 
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

var timerSetGraph = LCARS.create({type: 'wrapper', id: 'timerSetGraph', children: [
	{type: 'elbow', direction: 'top-left', version: 'vertical', size: 'small', color:'bg-orange-4', id: 'timerFrameTopLeft'},	
	{type: 'elbow', direction: 'bottom-left', version: 'vertical', size: 'small', color:'bg-orange-4', id: 'timerFrameBottomLeft'},	
	{type: 'elbow', direction: 'bottom-right', version: 'vertical', size: 'small', color:'bg-orange-4', id: 'timerFrameBottomRight'},	
  {type: 'elbow', direction: 'top-right', version: 'vertical', size: 'small', color:'bg-orange-4', id: 'timerFrameTopRight'},	
  {type: 'bar', color: 'bg-orange-3', id: 'timerBar'},
  {type: 'bar', color: 'bg-green-2', id: 'currentTimeBar'},
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
  {type: 'row', flex: 'h', id: 'timerSetScaleMiddle', children: [
    {type: 'bar', color: 'bg-purple-1', children: [
      {type: 'text', color: 'bg-purple-1', 'text': '0000', style: {'padding-left': '2px', 'padding-top': '5px'}}
    ]},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', children: [
      {type: 'text', color: 'bg-purple-1', 'text': '0400', style: {'padding-left': '2px', 'padding-top': '5px'}}
    ]},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', children: [
      {type: 'text', color: 'bg-purple-1', 'text': '0800', style: {'padding-left': '2px', 'padding-top': '5px'}}
    ]},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', children: [
      {type: 'text', color: 'bg-purple-1', 'text': '1200', style: {'padding-left': '2px', 'padding-top': '5px'}}
    ]},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', children: [
      {type: 'text', color: 'bg-purple-1', 'text': '1600', style: {'padding-left': '2px', 'padding-top': '5px'}}
    ]},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', children: [
      {type: 'text', color: 'bg-purple-1', 'text': '2000', style: {'padding-left': '2px', 'padding-top': '5px'}}
    ]},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
    {type: 'bar', color: 'bg-purple-1', style: {'opacity':'0'}},
  ]},
]});

var timerSet = LCARS.create({type: 'row', flexc: 'h', id: 'timerSet', children: [
  {type: 'column', flexc: 'v', children: [
    {type: 'button', version: 'round', color: 'bg-green-2', label: 'LIGHT ON +', id: 'onInc'},
    {type: 'title', color: 'bg-grey-1', text: '00:00', id: 'onTime'},
    {type: 'button', version: 'round', color: 'bg-green-2', label: 'LIGHT ON -', id: 'onDec'},
  ]},
  {type: 'column', flexc: 'v', children: [
    {type: 'button', version: 'round', color: 'bg-green-4', label: 'LIGHT OFF +', id: 'offInc'},
    {type: 'title', color: 'bg-grey-1', text: '00:00', id: 'offTime'},
    {type: 'button', version: 'round', color: 'bg-green-4', label: 'LIGHT OFF -', id: 'offDec'},
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
  $('body').append((timerSetGraph).dom);
  $('#timerSetGraph').hide();
  $('body').append((timerSet).dom);
  $('#timerSet').hide();
  
  

  $('#homeButton').click(function(){homeButtonClick()});
  $('#timerAdjustButton').click(function(){timerAdjustButtonClick()});
  $('#timerOverrideButton').click(function(){timerOverrideButtonClick()});
  $('#lightPowerToggle').click(function(){lightPowerToggleClick()});

  $('#onInc').click(function(){onIncClick()});
  $('#offInc').click(function(){offIncClick()});
  $('#onDec').click(function(){onDecClick()});
  $('#offDec').click(function(){offDecClick()});
  
  setInterval(updateItems, 1000);
  updateTimerBar(onTime, offTime);

});

function updateItems() {
  bottomFrame4.set('label', startime());
  setTimeBarPostion();
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
    $('#timerSetGraph').hide();
    $('#timerSet').hide();
    timerAdjustButton.set('state', null);
    timerOverrideButton.set('state', null);    
  } else {
    $('#timerSetGraph').show();
    $('#timerSet').show();
    timerAdjustButton.set('state', 'red-dark-light');
    timerOverrideButton.set('state', 'disabled');
  }
}

function stardate() {
  var today = new Date;
  var sdYear = today.getFullYear();
  var sdMonth = today.getMonth() + 1;
  var sdDate = today.getDate();
  var strSDyear = sdYear.toString();
  var strSDmonth = sdMonth.toString();
  if (sdMonth < 10) {
    strSDmonth = '0' + strSDmonth;
  }
  var strSDdate = sdDate.toString();
  if (sdDate < 10) {
    strSDdate = '0' + strSDdate;
  }
  return strSDyear + '.' + strSDmonth + '.' + strSDdate;
}

function startime() {
  var today = new Date;
  var sdHours = today.getHours();
  var sdMinutes = today.getMinutes();
  var sdSeconds = today.getSeconds();
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

function setTimeBarPostion() {
  var today = new Date;
  var minutesElapsed = 60*today.getHours() + today.getMinutes();
  var proportionElapsed = minutesElapsed / (24*60);
  var pctPosition = 10 + proportionElapsed*83;
  $('#currentTimeBar').css('left', pctPosition.toString() + '%');
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

function onIncClick () {
  if (onTime < 96 && onTime < offTime-1) {onTime++;}
  $('#onTime').html(parseTime(onTime));
  updateTimerBar(onTime, offTime);
}

function onDecClick () {
  if (onTime > 0) {onTime--;}
  $('#onTime').html(parseTime(onTime));
  updateTimerBar(onTime, offTime);
}

function offIncClick () {
  if (offTime < 24*4) {offTime++;}
  $('#offTime').html(parseTime(offTime));
  updateTimerBar(onTime, offTime);
}

function offDecClick () {
  if (offTime > onTime+1) {offTime--;}
  $('#offTime').html(parseTime(offTime));
  updateTimerBar(onTime, offTime);
}

function parseTime (timeIndex) {
  var hours = Math.floor(timeIndex/4);
  var minutes = Math.floor(timeIndex*15 - hours*60);
  var strHours = hours.toString();
  if (hours < 10) {
    strHours = '0' + strHours;
  }
  var strMinutes = minutes.toString();
  if (minutes < 10) {
    strMinutes = '0' + strMinutes;
  }
  return strHours + ':' + strMinutes;
}

function updateTimerBar(onTime, offTime) {
  var startPos = 10 + onTime*83/96;
  var barLength = (offTime-onTime)*83/96;
  $('#timerBar').css('left', startPos.toString() + '%');  
  $('#timerBar').css('width', barLength.toString() + '%');
}