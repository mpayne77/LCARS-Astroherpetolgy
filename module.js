var today = new Date();
 
var topFrame1 = LCARS.create({type: 'bar', color:'bg-orange-3', label:'LCARS', id: 'topFrame1'});

var topFrame2 = LCARS.create({type: 'elbow', color:'bg-orange-3', label:'ACCESS', id: 'topFrame2'});

var topFrame3 = LCARS.create({type: 'bar', color:'bg-orange-4', id: 'topFrame3'});

var topFrame4 = LCARS.create({type: 'bar', color:'bg-orange-3', label: 'STARDATE', id: 'topFrame4'});

var topFrame5 = LCARS.create({type: 'bar', color:'bg-orange-4', id: 'stardate', label: stardate(), id: 'topFrame5'});

var pageTitle = LCARS.create({type: 'title', color:'bg-orange-4', text: 'ASTROHERPETOLOGY', id: 'pageTitle'});

var bottomFrame1 = LCARS.create({type: 'elbow', color:'bg-orange-3', direction: 'top-left', id: 'bottomFrame1'});

var bottomFrame2 = LCARS.create({type: 'bar', color:'bg-orange-3', id: 'bottomFrame2'});

var bottomFrame3 = LCARS.create({type: 'bar', color:'bg-orange-3', label: 'TIME', id: 'bottomFrame3'});

var bottomFrame4 = LCARS.create({type: 'bar', color:'bg-orange-3', id: 'startime', label: startime(), id: 'bottomFrame4'});

var button1 = LCARS.create({type: 'button', id: 'button1', color:'bg-purple-5', label:'button1'});

var button2 = LCARS.create({type: 'button', color:'bg-purple-4', label:'BUTTON 2', id: 'button2'});

var button3 = LCARS.create({type: 'button', color:'bg-orange-4', label:'BUTTON 3', id: 'button3'});

var turtlePicture = LCARS.create({type: 'img', src: 'tortoise.png', id: 'turtlePicture',});

var pictureBracket = LCARS.create({type: 'defaultBracket', namespace: 'sdk', id:'pictureBracket',
  coloring: {
    elbow: 'bg-orange-5',
    column1: ['bg-orange-4', 'bg-orange-3', 'bg-orange-4'],
    column2: ['bg-purple-5', 'bg-purple-4', 'bg-purple-5'],
    column3: ['bg-purple-5', 'bg-purple-4', 'bg-purple-5'],
    column4: ['bg-orange-4', 'bg-green-2', 'bg-orange-4'],
    animated: 'bg-red-4'                                          
  }
});

$(document).ready( function(){
  console.log(stardate());
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
  $('body').append((button1).dom);
  $('body').append((button2).dom);
  $('body').append((button3).dom);
  $('body').append((turtlePicture).dom);
  $('body').append((pictureBracket).dom);
  $('#button2').click(function(){
    console.log("button 2 clicked")});
  $('#button3').click(function(){button3click()});
  setInterval(updateItems, 1000);
});

function updateItems() {
  bottomFrame4.set('label', startime());
}

function button3click() {
  console.log("button 3 clicked");
  if (button3.get('color') == 'bg-orange-4') {
    button3.set('color', 'bg-green-1');
  } else {
    button3.set('color', 'bg-orange-4');
  }
  const beep = document.getElementById('beep2');
  beep.play();

}

function stardate() {
  var today = new Date;
  var sdYear = today.getUTCFullYear();
  var sdMonth = today.getUTCMonth();
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

  console.log(strSDyear + strSDmonth + strSDdate);

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

  console.log(strSDhours + strSDminutes);

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

