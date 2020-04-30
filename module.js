let today = new Date();
let lightStatus = 'UNKNOWN';
let onTime = 0;
let offTime = 1;
let mode = 'NORMAL';
let tempLight = 0.0;
let rhLight = 0.0;
let tempShade = 0.0;
let rhShade = 0.0;
let arduinoTime = '--:--:--';
let soilVWC = 0.0;
let uvIndex = 0.0;
let tzAdjust = -5;
let serverURL = 'http://192.168.1.219';

let topFrame1 = LCARS.create({type: 'bar', color:'bg-orange-3', label:'LCARS', id: 'topFrame1'});
let topFrame2 = LCARS.create({type: 'elbow', color:'bg-orange-3', label:'ACCESS', id: 'topFrame2'});
let topFrame3 = LCARS.create({type: 'bar', color:'bg-orange-4', id: 'topFrame3'});
let topFrame4 = LCARS.create({type: 'bar', color:'bg-orange-3', label: 'STARDATE:', id: 'topFrame4'});
let topFrame5 = LCARS.create({type: 'bar', color:'bg-orange-4', id: 'stardate', label: stardate(), id: 'topFrame5'});
let pageTitle = LCARS.create({type: 'title', color:'bg-orange-3', text: 'ASTROHERPETOLOGY', id: 'pageTitle'});
let bottomFrame1 = LCARS.create({type: 'elbow', color:'bg-orange-3', direction: 'top-left', id: 'bottomFrame1'});
let bottomFrame2 = LCARS.create({type: 'bar', color:'bg-orange-3', id: 'bottomFrame2'});
let bottomFrame3 = LCARS.create({type: 'bar', color:'bg-orange-3', label: 'TIME:', id: 'bottomFrame3'});
let bottomFrame4 = LCARS.create({type: 'bar', color:'bg-orange-3', id: 'localTime', label: localTime(), id: 'bottomFrame4'});
let diagnosticButton = LCARS.create({type: 'button', color:'bg-purple-5', label:'SYSTEM\nDIAGNOSTIC', id: 'diagnosticButton'});
let timerAdjustButton = LCARS.create({type: 'button', color:'bg-purple-4', label:'TIMER\nADJUST', id: 'timerAdjustButton'});
let timerOverrideButton = LCARS.create({type: 'button', color:'bg-orange-4', label:'TIMER\nOVERRIDE', id: 'timerOverrideButton'});
let turtlePicture = LCARS.create({type: 'img', src: 'tortoise.png', id: 'turtlePicture',});

let pictureBracket = LCARS.create({type: 'defaultBracket', namespace: 'sdk', id:'pictureBracket',
coloring: {
    elbow: 'bg-orange-5',
    column1: ['bg-orange-4', 'bg-orange-3', 'bg-orange-4'],
    column2: ['bg-purple-5', 'bg-purple-4', 'bg-purple-5'],
    column3: ['bg-purple-5', 'bg-purple-4', 'bg-purple-5'],
    column4: ['bg-orange-4', 'bg-green-2', 'bg-orange-4'],
    animated: 'bg-red-4'                                          
  },
});

let tempLightStatus = LCARS.create({type:'complexButton', id: 'tempLightStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-3', label: 'TEMP\n(LIGHT)', id: 'tempLightButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '--.-', id: 'tempLightText'}, 
  {type: 'bar', version: 'round-right', color: 'bg-purple-3', id: 'tempLightCap'}
]});

let rhLightStatus = LCARS.create({type:'complexButton', id: 'rhLightStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-4', label: 'RH\n(LIGHT)', id: 'rhLightButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '--.-', id: 'rhLightText'}, 
  {type: 'bar', version: 'round-right', color: 'bg-purple-4', id: 'rhLightCap'}
]});

let tempShadeStatus = LCARS.create({type:'complexButton', id: 'tempShadeStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-3', label: 'TEMP\n(SHADE)', id: 'tempShadeButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '--.-', id: 'tempShadeText'}, 
  {type: 'bar', version: 'round-right', color: 'bg-purple-3', id: 'tempShadeCap'}
]});

let rhShadeStatus = LCARS.create({type:'complexButton', id: 'rhShadeStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-4', label: 'RH\n(SHADE)', id: 'rhShadeButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '--.-', id: 'rhShadeText'}, 
  {type: 'bar', version: 'round-right', color: 'bg-purple-4', id: 'rhShadeCap'}
]});

let soilVWCStatus = LCARS.create({type:'complexButton', id: 'soilVWCStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-3', label: 'SOIL\nHUMIDITY', id: 'soilVWCButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '--.-', id: 'soilVWCText'}, 
  {type: 'bar', version: 'round-right', color: 'bg-purple-3', id: 'soilVWCCap'}
]});

let uvIndexStatus = LCARS.create({type:'complexButton', id: 'uvIndexStatus', children: [
  {type: 'button', version: 'round-left', color: 'bg-purple-4', label: 'UV\nINTENSITY', id: 'uvIndexButton'}, 
  {type: 'title', color: 'bg-grey-1', text: '--.-', id: 'uvIndexText'}, 
  {type: 'bar', version: 'round-right', color: 'bg-purple-4 ', id: 'uvIndexCap'}
]});

let lightPowerToggle = LCARS.create({type: 'button', version: 'round', color: 'bg-red-1', label: '', id: 'lightPowerToggle'});
let lightOverrideText = LCARS.create({type: 'text', color: 'bg-purple-1', text: lightOverrideMessage, id: 'lightOverrideText'});

let timerSetGraph = LCARS.create({type: 'wrapper', id: 'timerSetGraph', children: [
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

let timerSet = LCARS.create({type: 'row', flexc: 'h', id: 'timerSet', children: [
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

let infoText = LCARS.create({type: 'column', flex: 'v', id: 'infoText', children: [
  {type: 'row', flex: 'h', children: [
    {type: 'oval', color: 'bg-purple-1', size: 'small'},
    {type: 'text', color: 'bg-purple-2', text: textInfo1},
  ]},
  {type: 'row', flex: 'h', children: [
    {type: 'oval', color: 'bg-purple-1', size: 'small'},
    {type: 'text', color: 'bg-purple-2', text: textInfo2},
  ]},
  {type: 'row', flex: 'h', children: [
    {type: 'oval', color: 'bg-purple-1', size: 'small'},
    {type: 'text', color: 'bg-purple-2', text: textInfo2a},
  ]},
  {type: 'row', flex: 'h', children: [
    {type: 'oval', color: 'bg-purple-1', size: 'small'},
    {type: 'text', color: 'bg-purple-2', text: textInfo3},
  ]},
  {type: 'row', flex: 'h', children: [
    {type: 'oval', color: 'bg-purple-1', size: 'small'},
    {type: 'text', color: 'bg-purple-2', text: textInfo4},
  ]},
  {type: 'row', flex: 'h', children: [
    {type: 'oval', color: 'bg-purple-1', size: 'small'},
    {type: 'text', color: 'bg-purple-2', text: textInfo5},
  ]},
  {type: 'row', flex: 'h', children: [
    {type: 'oval', color: 'bg-purple-1', size: 'small'},
    {type: 'text', color: 'bg-purple-2', text: textInfo6},
  ]},
]});

let diagnosticFrame = LCARS.create({type: 'column', flex: 'v', id: 'diagnosticFrame', children: [
  {type: 'row', flex: 'h', id: 'tzAdjust', children: [
    {type: 'button', version: 'round-left', color: 'bg-purple-1', text: '-', id: 'tzDecButton'},
    {type: 'text', color: 'bg-grey-1', text: '--', id: 'tzAdjustText'},
    {type: 'button', version: 'round-right', color: 'bg-purple-1', text: '+', id: 'tzIncButton'}
  ]},
  {type: 'row', flex: 'h', id: 'tzSetButtonContainer', children: [
    {type: 'button', version: 'round', color: 'bg-orange-2', text: 'SET TIME ZONE OFFSET', id: 'tzSetButton'}
  ]},
  {type: 'row', flex: 'h', id: 'diagTextRow', children: [
    {type: 'oval', color: 'bg-orange-2', size: 'small', id: 'diagOval'},
    {type: 'text', color: 'bg-purple-2', text: 'ARDUINO RTC TIME:', id: 'diagText1'},
    {type: 'text', color: 'bg-green-4', text: '00:00', id: 'diagResult1'}
  ]},
  {type: 'row', flex: 'h', id: 'diagTextRow', children: [
    {type: 'oval', color: 'bg-orange-2', size: 'small', id: 'diagOval'},
    {type: 'text', color: 'bg-purple-2', text: 'AM2315 (TEMP/RH LIGHT SIDE):', id: 'diagText2'},
    {type: 'text', color: 'bg-red-1', text: 'OFFLINE', id: 'diagResult2', state: 'blink'}
  ]},
  {type: 'row', flex: 'h', id: 'diagTextRow', children: [
    {type: 'oval', color: 'bg-orange-2', size: 'small', id: 'diagOval'},
    {type: 'text', color: 'bg-purple-2', text: 'AM2315 (TEMP/RH SHADE SIDE):', id: 'diagText3'},
    {type: 'text', color: 'bg-red-1', text: 'OFFLINE', id: 'diagResult3', state: 'blink'}
  ]},
  {type: 'row', flex: 'h', id: 'diagTextRow', children: [
    {type: 'oval', color: 'bg-orange-2', size: 'small', id: 'diagOval'},
    {type: 'text', color: 'bg-purple-2', text: 'VH400 (SOIL HUMIDITY):', id: 'diagText4'},
    {type: 'text', color: 'bg-red-1', text: 'OFFLINE', id: 'diagResult4', state: 'blink'}
  ]},
  {type: 'row', flex: 'h', id: 'diagTextRow', children: [
    {type: 'oval', color: 'bg-orange-2', size: 'small', id: 'diagOval'},
    {type: 'text', color: 'bg-purple-2', text: 'UV LIGHT SENSOR:', id: 'diagText5'},
    {type: 'text', color: 'bg-red-1', text: 'OFFLINE', id: 'diagResult5', state: 'blink'}
  ]},

]});


$(document).ready(function(){
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
  $('body').append((diagnosticButton).dom);
  $('body').append((timerAdjustButton).dom);
  $('body').append((timerOverrideButton).dom);
  $('body').append((turtlePicture).dom);
  $('body').append((pictureBracket).dom);
  $('body').append((tempLightStatus).dom);
  $('body').append((rhLightStatus).dom);
  $('body').append((tempShadeStatus).dom);
  $('body').append((rhShadeStatus).dom);
  $('body').append((soilVWCStatus).dom);
  $('body').append((uvIndexStatus).dom);
  $('body').append((lightPowerToggle).dom);
  $('#lightPowerToggle').hide();
  $('body').append((lightOverrideText).dom);
  $('#lightOverrideText').hide();
  $('body').append((timerSetGraph).dom);
  $('#timerSetGraph').hide();
  $('body').append((timerSet).dom);
  $('#timerSet').hide();
  $('body').append((diagnosticFrame).dom);
  $('#diagnosticFrame').hide();
  
  
  $('body').append((infoText).dom);
  

  $('body').append((diagnosticFrame).dom);
  
  

  $('#diagnosticButton').click(function(){diagnosticButtonClick()});
  $('#timerAdjustButton').click(function(){timerAdjustButtonClick()});
  $('#timerOverrideButton').click(function(){timerOverrideButtonClick()});
  $('#lightPowerToggle').click(function(){lightPowerToggleClick()});

  $('#onInc').click(function(){onIncClick()});
  $('#offInc').click(function(){offIncClick()});
  $('#onDec').click(function(){onDecClick()});
  $('#offDec').click(function(){offDecClick()});
  
  $('#tzSetButton').click(function(){tzSetButtonClick()});
  $('#tzDecButton').click(function(){tzDecButtonClick()});
  $('#tzIncButton').click(function(){tzIncButtonClick()});

  setInterval(updateItems, 1000);
  updateTimerBar(onTime, offTime);

});

function fetchJSON(reqPath) {
  let fullURL = serverURL + reqPath;
  
  $.get(fullURL, function(data) {  
  // Collect and parse JSON from Arduino
  let jsonData = JSON.parse(data);
    console.log(jsonData);
    lightStatus = jsonData.lightStatus;
    mode = jsonData.mode;
    tempLight = jsonData.tempLight;
    rhLight = jsonData.rhLight;
    tempShade = jsonData.tempShade;
    rhShade = jsonData.rhShade;
    arduinoTime = jsonData.time;
    soilVWC = jsonData.soilVWC;
    uvIndex = jsonData.uvIndex;
    
    if (mode != 'TIMERSET') {
      onTime = jsonData.timerLow;
      offTime = jsonData.timerHigh;
    }

    if (mode != 'DIAGNOSTIC') {
      tzAdjust = jsonData.tzAdjust;
    }
  });
}

function tempReadLockout () {
  let today = new Date;
  let t = today.getSeconds();
  if (t > 30 && t < 35) {
    return true;
  }  else {
    return false;
  }
}

// Requests JSON from Arduino and updates all UI elements accordingly
function updateItems() {
  
  topFrame5.set('label', stardate());
  bottomFrame4.set('label', localTime());
  
  setTimeBarPostion();

  if (!tempReadLockout()) {
    fetchJSON('/');
  }
  
  if (lightStatus === 'ON') {
    uvIndexStatus.set('state', 'blink');
    uvIndexStatus.set('colors', ['bg-blue-1', 'bg-grey-1', 'bg-blue-1']);
    tempLightStatus.set('state', 'blink');
    tempLightStatus.set('colors', ['bg-blue-1', 'bg-grey-1', 'bg-blue-1']);
    lightPowerToggle.set('label', 'TURN LIGHT OFF');
    lightPowerToggle.set('color', 'bg-red-1');
  } else {
    uvIndexStatus.set('state', null);
    uvIndexStatus.set('colors', ['bg-purple-4', 'bg-grey-1', 'bg-purple-4']);
    tempLightStatus.set('state', null);
    tempLightStatus.set('colors', ['bg-purple-3', 'bg-grey-1', 'bg-purple-3']);
    lightPowerToggle.set('label', 'TURN LIGHT ON');
    lightPowerToggle.set('color', 'bg-red-2');
  }

  switch(mode) {
    case 'NORMAL':
      $('#lightPowerToggle').hide();
      $('#lightOverrideText').hide();
      $('#timerSetGraph').hide();
      $('#timerSet').hide();
      $('#diagnosticFrame').hide();
      $('#infoText').show();
      $('#onTime').html(parseTime(onTime));
      $('#offTime').html(parseTime(offTime));
      timerOverrideButton.set('state', null);
      timerAdjustButton.set('state', null);
      diagnosticButton.set('state', null);
      updateTimerBar(onTime, offTime);
      break;
    case 'TIMEROVERRIDE':
      $('#infoText').hide();
      $('#lightPowerToggle').show();
      $('#lightOverrideText').show();
      timerOverrideButton.set('state', 'red-dark-light');
      timerAdjustButton.set('state', 'disabled');
      diagnosticButton.set('state', 'disabled');
      break;
    case 'TIMERSET':
      $('#infoText').hide();
      $('#timerSetGraph').show();
      $('#timerSet').show();
      timerAdjustButton.set('state', 'red-dark-light');
      timerOverrideButton.set('state', 'disabled');
      diagnosticButton.set('state', 'disabled');
      break;
    case 'DIAGNOSTIC':
      $('#infoText').hide();
      $('#diagnosticFrame').show();
      timerAdjustButton.set('state', 'disabled');
      timerOverrideButton.set('state', 'disabled');
      diagnosticButton.set('state', 'red-dark-light');
      
      LCARS.active.diagResult1.set('text', arduinoTime);

      if (tempLight > 0 && rhLight > 0) {
        LCARS.active.diagResult2.set('text', 'ONLINE');
        LCARS.active.diagResult2.set('color', 'bg-green-1');
        LCARS.active.diagResult2.set('state', null);
      } else {
        LCARS.active.diagResult2.set('text', 'OFFLINE');
        LCARS.active.diagResult2.set('color', 'bg-red-1');
        LCARS.active.diagResult2.set('state', 'blink');
      }

      if (tempShade > 0 && rhShade > 0) {
        LCARS.active.diagResult3.set('text', 'ONLINE');
        LCARS.active.diagResult3.set('color', 'bg-green-1');
        LCARS.active.diagResult3.set('state', null);
      } else {
        LCARS.active.diagResult3.set('text', 'OFFLINE');
        LCARS.active.diagResult3.set('color', 'bg-red-1');
        LCARS.active.diagResult3.set('state', 'blink');
      }

      if (soilVWC > 1) {
        LCARS.active.diagResult4.set('text', 'ONLINE');
        LCARS.active.diagResult4.set('color', 'bg-green-1');
        LCARS.active.diagResult4.set('state', null);
      } else {
        LCARS.active.diagResult4.set('text', 'OFFLINE');
        LCARS.active.diagResult4.set('color', 'bg-red-1');
        LCARS.active.diagResult4.set('state', 'blink');
      }
      
      if (uvIndex < 10) {
        LCARS.active.diagResult5.set('text', 'ONLINE');
        LCARS.active.diagResult5.set('color', 'bg-green-1');
        LCARS.active.diagResult5.set('state', null);
      } else {
        LCARS.active.diagResult5.set('text', 'OFFLINE');
        LCARS.active.diagResult5.set('color', 'bg-red-1');
        LCARS.active.diagResult5.set('state', 'blink');
      }
  }

  if (tempLight > 0) {
    LCARS.active.tempLightText.set('text', (tempLight.toFixed(1)).toString());
  } else {
    LCARS.active.tempLightText.set('text', '--.-');
  }
  
  if (rhLight > 0) {
    LCARS.active.rhLightText.set('text', (rhLight.toFixed(1)).toString());
  } else {
    LCARS.active.rhLightText.set('text', '--.-');
    
  }
  
  if (tempShade > 0) {
    LCARS.active.tempShadeText.set('text', (tempShade.toFixed(1)).toString());
  } else {
    LCARS.active.tempShadeText.set('text', '--.-');
  }
  
  if (rhShade > 0) {
    LCARS.active.rhShadeText.set('text', (rhShade.toFixed(1)).toString());
  } else {
    LCARS.active.rhShadeText.set('text', '--.-');
  }

  if (soilVWC > 1) {
    LCARS.active.soilVWCText.set('text', (soilVWC.toFixed(1)).toString());
  } else {
    LCARS.active.soilVWCText.set('text', '--.-');
  }
  
  if (uvIndex > 0.03) {
    LCARS.active.uvIndexText.set('text', (uvIndex.toFixed(1)).toString());
  } else {
    LCARS.active.uvIndexText.set('text', '--.-');
  }

  LCARS.active.tzAdjustText.set('text', tzAdjust.toString());
  
}

// Toggles between normal and diagnostic mode
function diagnosticButtonClick() {
  const beep = document.getElementById('beep2');
  //beep.play();
  if (mode == 'NORMAL') {
    $.get('http://192.168.1.219/DIAGNOSTIC');
  } else {
    $.get('http://192.168.1.219/NORMAL');
  }
}

// Toggles between normal and timer override mode
function timerOverrideButtonClick() {
  const beep = document.getElementById('beep1');
  //beep.play();
  if (mode == 'NORMAL') {
    $.get('http://192.168.1.219/TIMEROVERRIDE');
  } else {
    $.get('http://192.168.1.219/NORMAL');
  }
}

// Toggles between normal and timer adjust mode
// When exiting timer adjust mode back to normal mode, request to adjust timer thresholds
// is sent to the Arduino
function timerAdjustButtonClick() {
  const beep = document.getElementById('beep1');
  //beep.play();
  if (mode == 'NORMAL') {
    $.get('http://192.168.1.219/TIMERSET');
  } else {
    $.get('http://192.168.1.219/' + onTime.toString() + '-' + offTime.toString() + '-SETTIMER');
  }
}


// Sends request to Arduino to reset RTC with specified offset for local time zone.
// To avoid needing to parse negative and positive numbers in the URL request string, I'm
// adding 12 to the time zone before sending, then removing that 12 on the Arduino side
function tzSetButtonClick() {
  let tzOffset = tzAdjust + 12;
  let tzOffsetStr = tzOffset.toString();
  if (tzOffset < 10) {
    tzOffsetStr = '0' + tzOffsetStr;
  }
  $.get('http://192.168.1.219/' + tzOffsetStr + '-SETCLOCK');
}

// Pulls local time from network and returns date string in YYYY.MM.DD format
function stardate() {
  let today = new Date;
  let sdYear = today.getFullYear();
  let sdMonth = today.getMonth() + 1;
  let sdDate = today.getDate();
  let strSDyear = sdYear.toString();
  let strSDmonth = sdMonth.toString();
  if (sdMonth < 10) {
    strSDmonth = '0' + strSDmonth;
  }
  let strSDdate = sdDate.toString();
  if (sdDate < 10) {
    strSDdate = '0' + strSDdate;
  }
  return strSDyear + '.' + strSDmonth + '.' + strSDdate;
}

// Pulls local time from network and returns string in HH:MM:SS format
function localTime() {
  let today = new Date;
  let sdHours = today.getHours();
  let sdMinutes = today.getMinutes();
  let sdSeconds = today.getSeconds();
  let strSDhours = sdHours.toString();
  if (sdHours < 10) {
    strSDhours = '0' + strSDhours;
  }
  let strSDminutes = sdMinutes.toString();
  if (sdMinutes < 10) {
    strSDminutes = '0' + strSDminutes;
  }
  let strSDseconds = sdSeconds.toString();
  if (sdSeconds < 10) {
    strSDseconds = '0' + strSDseconds;
  }
  return strSDhours + ':' + strSDminutes + ':' + strSDseconds;
}

// Draws bar representing current local time on timer adjust bar graph
function setTimeBarPostion() {
  let today = new Date;
  let minutesElapsed = 60*today.getHours() + today.getMinutes();
  let proportionElapsed = minutesElapsed / (24*60);
  let pctPosition = 10 + proportionElapsed*83;
  $('#currentTimeBar').css('left', pctPosition.toString() + '%');
}

// Toggles light on and off
function lightPowerToggleClick () {
  const beep = document.getElementById('beep4');
  //beep.play();
  if (lightStatus === 'ON') {
    $.get('http://192.168.1.219/LIGHT-OFF');
  } else {
    $.get('http://192.168.1.219/LIGHT-ON');
  }
}

// Increments on time for light timer
function onIncClick () {
  if (onTime < 96 && onTime < offTime-1) {onTime++;}
  $('#onTime').html(parseTime(onTime));
  updateTimerBar(onTime, offTime);
}

// Decrements on time for light timer
function onDecClick () {
  if (onTime > 0) {onTime--;}
  $('#onTime').html(parseTime(onTime));
  updateTimerBar(onTime, offTime);
}

// Increments off time for light timer
function offIncClick () {
  if (offTime < 24*4) {offTime++;}
  $('#offTime').html(parseTime(offTime));
  updateTimerBar(onTime, offTime);
}

// Decrements off time for light timer
function offDecClick () {
  if (offTime > onTime+1) {offTime--;}
  $('#offTime').html(parseTime(offTime));
  updateTimerBar(onTime, offTime);
}

// Converts time index into string in HH:MM format
function parseTime (timeIndex) {
  let hours = Math.floor(timeIndex/4);
  let minutes = Math.floor(timeIndex*15 - hours*60);
  let strHours = hours.toString();
  if (hours < 10) {
    strHours = '0' + strHours;
  }
  let strMinutes = minutes.toString();
  if (minutes < 10) {
    strMinutes = '0' + strMinutes;
  }
  return strHours + ':' + strMinutes;
}

// Draws bar representing time light will be powered on timer adjust bar graph
function updateTimerBar(onTime, offTime) {
  let startPos = 10 + onTime*83/96;
  let barLength = (offTime-onTime)*83/96;
  $('#timerBar').css('left', startPos.toString() + '%');  
  $('#timerBar').css('width', barLength.toString() + '%');
}

// Increments time zone offset
function tzDecButtonClick () {
  if (tzAdjust > -12 && tzAdjust <= 12) {
    tzAdjust--;
    LCARS.active.tzAdjustText.set('text', tzAdjust);
  }
}

// Decrements time zone offset
function tzIncButtonClick () {
  if (tzAdjust >= -12 && tzAdjust < 12) {
    tzAdjust++;
    LCARS.active.tzAdjustText.set('text', tzAdjust);
  }
}