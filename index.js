const response_general = undefined;

// function view(){
//     const file = document.getElementById('demo').files[0];
//     console.log(file);
//     imageConversion.compressAccurately(file,200).then(res=>{
//       //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
//       console.log(res);
//     })
//   }

//   // or use an async function
//   async function view() {
//     const file = document.getElementById('demo').files[0];
//     console.log(file);
//     const res = await imageConversion.compressAccurately(file,200)
//     console.log(res);
//     // response_general = res;
//     imageConversion.downloadFile(res, "comprimidochines.jpg")
//   }

// function view() {
//   const file = document.getElementById('demo').files[0];
//   console.log(file);
//   console.log(btoa(file));
//   // imageConversion.compress(file, 0.7).then(res => {
//   //   console.log(res);
//   //   imageConversion.downloadFile(res, "comprimidochines.jpg")
//   // })
//   // window.URL.toDataURL(btoa(file).toDataURL)

// }

function view() {
  const file = document.getElementById('demo').files[0];
  console.log(file);
  console.log(btoa(file));
  const blobURL = URL.createObjectURL(file);
  const img = new Image();
  img.src = blobURL;
  // imageConversion.compress(file, 0.7).then(res => {
  //   console.log(res);
  //   imageConversion.downloadFile(res, "comprimidochines.jpg")
  // })
  // window.URL.toDataURL(btoa(file).toDataURL)

}
function download() {
}

const MAX_WIDTH = 800;
const MAX_HEIGHT = 530;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.9;

const input = document.getElementById("img-input");
input.onchange = function (ev) {

  const file = ev.target.files[0]; // get the file
  const blobURL = URL.createObjectURL(file);
  const img = new Image();
  img.src = blobURL;
  img.onerror = function () {
    URL.revokeObjectURL(this.src);
    // Handle the failure properly
    console.log("Cannot load image");
  };
  img.onload = function () {
    URL.revokeObjectURL(this.src);
    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    for (let i = 7; i < 10; i++) {
      var quality = Number(`0.${i}`);
      canvas.toBlob(
        (blob) => {
          // Handle the compressed image. es. upload or save in local state
          displayInfo('Original file', file);
          displayInfo('Compressed file', blob);
          displayInfo(`quality ${Number(`0.${i}`)}`, blob);
          imageConversion.downloadFile(blob, `teste ${Number(`0.${i}`)}.jpg`)
        },
        MIME_TYPE,
        quality
      );
      document.getElementById("root").append(canvas);
    }

  };
};

function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

// Utility functions for demo purpose

function displayInfo(label, file) {
  const p = document.createElement('p');
  p.innerText = `${label} - ${readableBytes(file.size)}`;
  document.getElementById('root').append(p);
}

function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}