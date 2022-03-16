/*
CS-385: Assigment 2 
Made by Jonathan Calderon Chavez
Professor: Dave Shreiner
Feb 10, 2022
*/

var angle = 0;

function init(){

    canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(0.0, 0.0, 0, 1);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST); 
    cube = new Cube(gl);

   render = function(){  // structure based on render function in Cone.js
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //, gl.DEPTH_BUFFER_BIT);
        angle += 1;

        cube.V = lookAt(
            vec3(0, 1, 5),
            vec3(0, 0, 0),
            vec3(0.0, 2.0, 0.0)
        ); 

        cube.MV = rotate(angle, [0, 0, 1]);  // rotate around the axis (1, 1, 1)
        cube.P  = perspective(30, 1, 0.5, 6);
        
        cube.render();
        requestAnimationFrame(render);
    }
    render();
}

window.onload = init;

