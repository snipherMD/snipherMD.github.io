var imag=new SimpleImage();
var imag2=new SimpleImage();
var imagRed=new SimpleImage();
var imagNeg=new SimpleImage();
var imagRain=new SimpleImage();
var imagBlur=new SimpleImage();
var canvas=document.getElementById("can");
function loadImage(){
  var file=document.getElementById("finput");
  imag =new SimpleImage(file);
  imag2 =new SimpleImage(file);
  imagRed =new SimpleImage(file);
  imagNeg=new SimpleImage(file);
  imagRain=new SimpleImage(file);
  imagBlur=new SimpleImage(file);
 //alert('Image loaded');
  imag.drawTo(canvas)
}
function imageIsLoaded(image){
  if(image===null || ! image.complete()){
    return false;
  }
  else{
    return true;
  }
}
function gray(){
  if(imageIsLoaded(imag)){
  for(var pixel of imag.values()){
      var red=pixel.getRed();
      var blue=pixel.getBlue();
      var green=pixel.getGreen();
      var avr=(red+green+blue)/3;
      pixel.setRed(avr);
      pixel.setGreen(avr);
      pixel.setBlue(avr);  
  }  
  imag.drawTo(canvas);
  }
  //alert('GrayScale Filter');
}
function red(){
  if(imageIsLoaded(imagRed)){
    for(var pixel of imagRed.values()){
     var avr=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3
     if(avr<128){
       pixel.setRed(2*avr);
       pixel.setGreen(0);
       pixel.setBlue(0);
     }else{
       pixel.setRed(255);
       pixel.setGreen(2*avr-255);
       pixel.setBlue(2*avr-255);
     }
      
      // pixel.setRed(255);
    }
    imagRed.drawTo(canvas);
  
    //alert('RedScale Filter');
  }
}
function reset(){
  if(imageIsLoaded(imagRed)){
  var context= canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  imag2.drawTo(canvas);
    imag=new SimpleImage(imag2);
    imagRed=new SimpleImage(imag2);
    imagNeg=new SimpleImage(imag2);
    imagRain=new SimpleImage(imag2);
    imagBlur=new SimpleImage(imag2);
  }else{
    alert('Reset failed');
  }
 // 
}
function negative(){
  if(imageIsLoaded(imagNeg)){
    for(var pixel of imagNeg.values()){
        pixel.setRed(255-pixel.getRed());
        pixel.setGreen(255-pixel.getGreen());
        pixel.setBlue(255-pixel.getBlue());
        
    }
  imagNeg.drawTo(canvas);
  }
}
function Rainbow(){
  if(imageIsLoaded(imagRain)){
    var x=imagRain.getWidth();
    var y=imagRain.getHeight();
    var sec=y/7;
    for(var pixel of imagRain.values()){
        var avr=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        if(pixel.getY()<sec){
            if(avr<128){
                pixel.setRed(2*avr);
                pixel.setGreen(0);
                pixel.setBlue(0);
            }    
            else{
                pixel.setRed(255);
                pixel.setGreen(2*avr-255);
                pixel.setBlue(2*avr-255);
            }
            }else if(pixel.getY()>=sec&& pixel.getY()<2*sec){
                if(avr<128){
                    pixel.setRed(2*avr);
                pixel.setGreen(0.8*avr);
                pixel.setBlue(0);
                }else{
                    pixel.setRed(255);
                pixel.setGreen(1.2*avr-51);
                pixel.setBlue(2*avr-255);
                }
            }else if(pixel.getY()>=2*sec && pixel.getY()<3*sec){
                if(avr<128){
                    pixel.setRed(2*avr);
                pixel.setGreen(2*avr);
                pixel.setBlue(2*avr);
                }else{
                    pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(2*avr-255);
                }
            }else if(pixel.getY()>=3*sec&&pixel.getY()<4*sec){
                if(avr<128){
                    pixel.setRed(0);
                pixel.setGreen(2*avr);
                pixel.setBlue(0);
                }else{
                    pixel.setRed(2*avr-255);
                pixel.setGreen(255);
                pixel.setBlue(2*avr-255);
                }
            }else if(pixel.getY()>=4*sec&&pixel.getY()<5*sec){
                if(avr<128){
                    pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2*avr);
                }else{
                    pixel.setRed(2*avr-255);
                pixel.setGreen(2*avr-255);
                pixel.setBlue(255);
                }
            }else if(pixel.getY()>=5*sec&&pixel.getY()<=6*sec){
                if(avr<128){
                    pixel.setRed(0.8*avr);
                pixel.setGreen(0);
                pixel.setBlue(2*avr);
                }else{
                    pixel.setRed(1.2*avr-51);
                pixel.setGreen(2*avr-255);
                pixel.setBlue(255);
                }
            }else{
                if(avr<128){
                    pixel.setRed(1.6*avr);
                pixel.setGreen(0);
                pixel.setBlue(1.6*avr);
                }else{
                    pixel.setRed(0.4*avr+153);
                pixel.setGreen(2*avr-255);
                pixel.setBlue(0.4*avr+153);
                }
            }

    }
  }
  imagRain.drawTo(canvas);
}
function Blur(){
  if(imageIsLoaded(imagBlur)){
    var height=imagBlur.getHeight()-1;
    var width=imagBlur.getWidth()-1;
    for(var pixel of imagBlur.values()){
        var r=Math.random()*10;
        var x=Math.floor(pixel.getX()+r) || Math.floor(pixel.getX()-r);
        var y=Math.floor(pixel.getY()+r) || Math.floor(pixel.getY()-r);
        if(x>width){
        x=imagBlur.getWidth-1;
        }else if(x<0){
        x=0;
    }
        if(y>height){
             y=imagBlur.getHeight()-1;
        }else if(y<0){
        y=0;
    }
            var pixel1=imagBlur.getPixel(x,y);
            var ran=Math.random();
         if(ran>0.5){
            pixel.setRed(pixel1.getRed());
            pixel.setGreen(pixel1.getGreen());
            pixel.setBlue(pixel.getBlue());
        }
    }
    imagBlur.drawTo(canvas);
  }
}