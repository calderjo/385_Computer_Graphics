
function Cube(gl) {

    var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");
    
    var positions = [
        0, 0, 0,   // vertex 0
        1, 0, 0,   // vertex 1
        1, 1, 0,   // vertex 2
        0, 1, 0,   // vertex 3
        0, 0, 1,   // vertex 4
        1, 0, 1,   // vertex 5
        1, 1, 1,   // vertex 6
        0, 1, 1    // vertex 7
    ];

    positions.numComponents = 3;
    
    var indices = [
        3, 1, 0,  // Front Face
        2, 1, 3,
        
        7, 4, 5, // Back Face
        6, 7, 5,

        3, 7, 2, // Top Face
        7, 6, 2,

        4, 0, 1, // Bottom Face
        5, 4, 1,

        3, 0, 4, // Side Face #1
        7, 3, 4,

        1, 2, 5, // Side Face #2
        2, 6, 5
    ];

    var edges = [
        0, 1,  // "Front" face edges
        1, 2,
        2, 3,
        3, 0,
        4, 5,  // "Back" face edges
        5, 6,
        6, 7,
        7, 4,
        0, 4,  // "Side" edges
        1, 5,
        2, 6,
        3, 7
    ];
            
    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );
    
    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );
    
    edges.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );
    
    MV = gl.getUniformLocation(program, "MV");
    this.MV = mat4();

    P = gl.getUniformLocation(program, "P");
    this.P = mat4();

    V = gl.getUniformLocation(program, "V");
    this.V = mat4();
    
    this.render = function () {
        gl.useProgram( program );
    
        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0
        );

        gl.uniformMatrix4fv(MV, false, flatten(this.MV));
        gl.uniformMatrix4fv(P, false, flatten(this.P));
        gl.uniformMatrix4fv(V, false, flatten(this.V));

        // Render the wireframe version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );

        // Render the solid version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};

