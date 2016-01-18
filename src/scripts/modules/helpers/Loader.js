import THREE from 'three';
import OBJLoader from '../vendors/OBJLoader';

export default class LoaderManager {

  constructor() {}

  loadObj(fileName, callback) {
    const loader = new THREE.OBJLoader();
    loader.load(fileName, (obj) => {
      callback(obj);
    }, this.onProgress, this.onError);
  }

  loadObjWithMtl(OBJFileName, MTLFileName, callback) {
    const loader = new THREE.OBJMTLLoader();
    loader.load(OBJFileName, MTLFileName, (obj) => {
      callback(obj);
    }, this.onProgress, this.onError);
  }

  loadImage(url) {
    const img = new Image();
    img.src = url;
    return img;
  }

  onProgress(xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  }

  onError(xhr) {
    console.error('ERROR : ', xhr);
  }

  onLoaded(item, loaded, total) {
    console.log('Loaded : ', item, loaded, total);
  }
}
