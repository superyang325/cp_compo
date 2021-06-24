const MEASURE_SIZE = 200;
function isImageFileType(type) {
  return !!type && type.indexOf('image/') === 0;
}
export default function previewImage(file) {
  return new Promise(function(resolve) {
    if (!isImageFileType(file.type)) {
      resolve('');
      return;
    }
    let canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = 'position: fixed; left: 0; top: 0; width: '
      .concat(MEASURE_SIZE, 'px; height: ')
      .concat(MEASURE_SIZE, 'px; z-index: 9999; display: none;');
    document.body.appendChild(canvas);
    let ctx = canvas.getContext('2d');
    let img = new Image();

    img.onload = function() {
      let width = img.width,
        height = img.height;
      let drawWidth = MEASURE_SIZE;
      let drawHeight = MEASURE_SIZE;
      let offsetX = 0;
      let offsetY = 0;

      if (width < height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      let dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      resolve(dataURL);
    };

    img.src = window.URL.createObjectURL(file);
  });
}
