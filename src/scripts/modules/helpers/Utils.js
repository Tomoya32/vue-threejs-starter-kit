import THREE from 'three';

export default class Utils {

  constructor() {

  }

  randomRange( min, max ) {

    return Math.floor( min + Math.random() * ( max - min ) );

  }

  clone( object ){

    return JSON.parse( JSON.stringify( object ) );

  }

  // Get uniformly distributed random points in mesh
	// 	- create array with cumulative sums of face areas
	//  - pick random number from 0 to total area
	//  - find corresponding place in area array by binary search
	//	- get random point in face

	randomPointsInGeometry( geometry, n ) {

		let face, i,
			faces = geometry.faces,
			vertices = geometry.vertices,
			il = faces.length,
			totalArea = 0,
			cumulativeAreas = [],
			vA, vB, vC, vD;

		// precompute face areas

		for ( i = 0; i < il; i ++ ) {

			face = faces[ i ];

			if ( face instanceof THREE.Face3 ) {

				vA = vertices[ face.a ];
				vB = vertices[ face.b ];
				vC = vertices[ face.c ];

				face._area = this.triangleArea( vA, vB, vC );

			} else if ( face instanceof THREE.Face4 ) {

				vA = vertices[ face.a ];
				vB = vertices[ face.b ];
				vC = vertices[ face.c ];
				vD = vertices[ face.d ];

				face._area1 = this.triangleArea( vA, vB, vD );
				face._area2 = this.triangleArea( vB, vC, vD );

				face._area = face._area1 + face._area2;

			}

			totalArea += face._area;

			cumulativeAreas[ i ] = totalArea;

		}

    function binarySearchIndices( value ) {

			function binarySearch( start, end ) {

				// return closest larger index
				// if exact number is not found

				if ( end < start )
					return start;

				var mid = start + Math.floor( ( end - start ) / 2 );

				if ( cumulativeAreas[ mid ] > value ) {

					return binarySearch( start, mid - 1 );

				} else if ( cumulativeAreas[ mid ] < value ) {

					return binarySearch( mid + 1, end );

				} else {

					return mid;

				}

			}

			var result = binarySearch( 0, cumulativeAreas.length - 1 )
			return result;

		}
    // pick random face weighted by face area

		var r, index,
			result = [];

		var stats = {};

		for ( i = 0; i < n; i ++ ) {

			r = THREE.Math.random16() * totalArea;

			index = binarySearchIndices( r );

			result[ i ] = this.randomPointInFace( faces[ index ], geometry, true );

			if ( ! stats[ index ] ) {

				stats[ index ] = 1;

			} else {

				stats[ index ] += 1;

			}

		}

		return result;

	}

  randomPointInFace( face, geometry, useCachedAreas ) {

		var vA, vB, vC, vD;

		if ( face instanceof THREE.Face3 ) {

			vA = geometry.vertices[ face.a ];
			vB = geometry.vertices[ face.b ];
			vC = geometry.vertices[ face.c ];

			return this.randomPointInTriangle( vA, vB, vC );

		} else if ( face instanceof THREE.Face4 ) {

			vA = geometry.vertices[ face.a ];
			vB = geometry.vertices[ face.b ];
			vC = geometry.vertices[ face.c ];
			vD = geometry.vertices[ face.d ];

			var area1, area2;

			if ( useCachedAreas ) {

				if ( face._area1 && face._area2 ) {

					area1 = face._area1;
					area2 = face._area2;

				} else {

					area1 = this.triangleArea( vA, vB, vD );
					area2 = this.triangleArea( vB, vC, vD );

					face._area1 = area1;
					face._area2 = area2;

				}

			} else {

				area1 = this.triangleArea( vA, vB, vD ),
				area2 = this.triangleArea( vB, vC, vD );

			}

			var r = THREE.Math.random16() * ( area1 + area2 );

			if ( r < area1 ) {

				return this.randomPointInTriangle( vA, vB, vD );

			} else {

				return this.randomPointInTriangle( vB, vC, vD );

			}

		}

	}

  randomPointInTriangle( vectorA, vectorB, vectorC ) {

		var vector = new THREE.Vector3();
    var point = new THREE.Vector3();

    var a = THREE.Math.random16();
    var b = THREE.Math.random16();

    if ( ( a + b ) > 1 ) {

      a = 1 - a;
      b = 1 - b;

    }

    var c = 1 - a - b;

    point.copy( vectorA );
    point.multiplyScalar( a );

    vector.copy( vectorB );
    vector.multiplyScalar( b );

    point.add( vector );

    vector.copy( vectorC );
    vector.multiplyScalar( c );

    point.add( vector );

    return point;


	}

  triangleArea( vectorA, vectorB, vectorC ) {

		var vector1 = new THREE.Vector3();
		var vector2 = new THREE.Vector3();

    vector1.subVectors( vectorB, vectorA );
    vector2.subVectors( vectorC, vectorA );
    vector1.cross( vector2 );

    return 0.5 * vector1.length();

	}

}
