//Append To Body
//$('body').append( LCARS.create({type:'button', color:'bg-blue-1', label:'Button'}).dom );

//$('body').append( 'Hello' );

/* var headerRow = LCARS.create({type: 'row', flex: 'h', id: 'headerRow', children: [
  {type: 'bar', flex: 'c-v', color: 'bg-orange-4'},
  {type: 'title', color: 'bg-text-4', text: 'ASTROHERPETOLOGY'},
  //{type: 'button', color: 'bg-red-1', label: 'Button2'}
  {type: 'cap', version: 'round-right', color: 'bg-orange-4'},
]});

var topFrame = LCARS.create({type: 'row', flexc : 'h', id: 'topFrame', children: [
  {type: 'column', flex: 'v', children: [
    {type: 'bar', color: 'bg-orange-4', label: 'LCARS', size: 'large', style: {'width':'100px', 'text-align':'right'}},
    {type: 'row', flexc: 'h', children: [
      {type: 'elbow', direction: 'bottom-left', version: 'horizontal', size:'medium', color: 'bg-orange-3', label: 'ACCESS', style: {'width':'100%'}}
    ]}
  ]}
]}); */

var topFrame = LCARS.create({type: 'column', flex: 'v', children: [
    {type: 'bar', color: 'bg-orange-4', label: 'LCARS', size: 'large', style: {'width':'80px', 'text-align':'right'}},
    {type: 'elbow', direction: 'bottom-left', version: 'horizontal', size:'medium', color: 'bg-orange-3', label: 'ACCESS', style: {'width':'100%'}}

]});

var topFrame1 = LCARS.create({type: 'bar', color:'bg-purple-1', label:'LCARS', style: {
  'position':'absolute',
  'width':'10%',
  'height':'10%',
  'left': '5px',
  'top': '5px',
  'text-align': 'right'
}});

var topFrame2 = LCARS.create({type: 'elbow', color:'bg-green-1', label:'ACCESS', style: {
  'position':'absolute',
  'width':'10%',
  'height':'15%',
  'left': '5px',
  'top': 'calc(10% + 10px)',
  'text-align': 'right',
  'padding-top':'5px'
}});

var topFrame3 = LCARS.create({type: 'bar', color:'bg-red-1', style: {
  'position':'absolute',
  'width':'calc(30% - 55px - 5px)',
  'height':'30px',
  'left': 'calc(10% + 55px)',
  'top': 'calc(25% - 20px)',
  'text-align': 'right'
}});

var topFrame4 = LCARS.create({type: 'bar', color:'bg-red-2', style: {
  'position':'absolute',
  'width':'calc(30%)',
  'height':'30px',
  'left': '40%',
  'top': 'calc(25% - 20px)',
  'text-align': 'right'
}});

var topFrame5 = LCARS.create({type: 'bar', color:'bg-red-3', style: {
  'position':'absolute',
  'width':'calc(30% - 10px)',
  'height':'30px',
  'left': 'calc(70% + 5px)',
  'top': 'calc(25% - 20px)',
  'text-align': 'right'
}});

var pageTitle = LCARS.create({type: 'title', color:'bg-text-1', text: 'ASTROHERPETOLOGY', style: {
  'position': 'absolute',
  'right':'10px',
  'top':'10px'
}});

var bottomFrame1 = LCARS.create({type: 'elbow', color:'bg-orange-1', direction: 'top-left', style: {
  'position':'absolute',
  'width':'10%',
  'height':'15%',
  'left': '5px',
  'top': 'calc(25% + 15px)',
  'text-align': 'right',
  'padding-top':'5px'
}});

var bottomFrame2 = LCARS.create({type: 'bar', color:'bg-red-1', style: {
  'position':'absolute',
  'width':'calc(30% - 55px - 5px)',
  'height':'30px',
  'left': 'calc(10% + 55px)',
  'top': 'calc(25% + 15px)',
  'text-align': 'right'
}});

var bottomFrame3 = LCARS.create({type: 'bar', color:'bg-red-2', style: {
  'position':'absolute',
  'width':'calc(30%)',
  'height':'30px',
  'left': '40%',
  'top': 'calc(25% + 15px)',
  'text-align': 'right'
}});

var bottomFrame4 = LCARS.create({type: 'bar', color:'bg-red-3', style: {
  'position':'absolute',
  'width':'calc(30% - 10px)',
  'height':'30px',
  'left': 'calc(70% + 5px)',
  'top': 'calc(25% + 15px)',
  'text-align': 'right'
}});

var bottomFrame5 = LCARS.create({type: 'button', color:'bg-purple-1', label:'BUTTON 1', style: {
  'position':'absolute',
  'width':'10%',
  'height':'calc(20% - 5px)',
  'left': '5px',
  'top': 'calc(40% + 20px)',
  'text-align': 'right'
}});

var bottomFrame6 = LCARS.create({type: 'button', color:'bg-purple-2', label:'BUTTON 2', style: {
  'position':'absolute',
  'width':'10%',
  'height':'calc(20% - 5px)',
  'left': '5px',
  'top': 'calc(60% + 20px)',
  'text-align': 'right'
}});

var bottomFrame7 = LCARS.create({type: 'button', color:'bg-purple-3', label:'BUTTON 3', style: {
  'position':'absolute',
  'width':'10%',
  'height':'calc(20% - 25px)',
  'left': '5px',
  'top': 'calc(80% + 20px)',
  'text-align': 'right'
}});

$(document).ready( function(){
  //$('body').append( LCARS.create({type:'button', color:'bg-blue-1', label:'Button'}).dom );
  //$('body').append('<p> hey dingus </p>');
  console.log( "sup bro" );
  //$('body').append((headerRow).dom);
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
  $('body').append((bottomFrame5).dom);
  $('body').append((bottomFrame6).dom);
  $('body').append((bottomFrame7).dom);
});