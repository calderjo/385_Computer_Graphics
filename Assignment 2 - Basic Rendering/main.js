/*
CS-385: Assigment 2 
Made by Jonathan Calderon Chavez
Professor: Dave Shreiner
Feb 10, 2022
*/

function init(){

    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(.42, 0, .2, .5);
    cone = new Cone(gl, 50);
    
   render = function(){  // structure based on render function in Cone.js
        gl.clear(gl.COLOR_BUFFER_BIT);
        cone.render();
    }

    render();
}

window.onload = init;
