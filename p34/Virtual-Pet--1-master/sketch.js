//Create variables here
var dog,happyDog;
var dog_img,happyDog_img;
var foodS,foodStock;
function preload()
{
  //load images here
  dog_img=loadImage("images/dogImg.png");
  happyDog_img=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  dog=createSprite(250,300,150,150)
  dog.addImage(dog_img)
  dog.scale=0.15
	
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20)
}


function draw() {  
  background(46,139,87)
  
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img)
  }
  drawSprites()
  stroke("black")
  fill("white")
  text("Food Remaining: "+foodS,170,200)
  textSize(13)
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20)
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

