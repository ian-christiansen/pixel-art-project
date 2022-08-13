export function setStorage(key, imageObject) {
    const imageString = JSON.stringify(imageObject);
    localStorage.setItem(key, imageString);
}

export function getStorage(key) {
    const imageString = localStorage.getItem(key);
    return JSON.parse(imageString);
}

export function titleKey(imageTitle) {
    let upperCaseTitle = imageTitle.toUpperCase();
    let noSpaceTitle = upperCaseTitle.replace(/[^a-zA-Z0-9]/g, '');
    return noSpaceTitle;
}

function isEven(num) {
    return num % 2 === 0;
}

export function createImage(title, heightInput, widthInput) {
    // let area = heightInput * widthInput;
    // let halfArea = Math.ceil(area / 2);
    let colorArray = [];
    // let x = widthInput / 2;
    // let y = 1;

    // just another approach you could try
    // this is less optimized bc it has a nested for loop
    // but i think its a little easier to understand
    // on odd rows you start with gray, on even you start with white
    // then you just push each value alternately for the entire width
    for (let i = 0; i < heightInput; i++){
        let tiles = isEven(i) ? ['rgb(243, 243, 244)', 'rgb(216, 216, 217)'] :
            ['rgb(216, 216, 217)', 'rgb(243, 243, 244)'] ;
        for (let i = 0; i < widthInput; i++){
            colorArray.push(tiles[i % 2]);
        }

    }
    // if (isEven(widthInput) === true) {
    //     for (let i = 0; i < halfArea; i++) {  
    //         if (isEven(y) === true) {
    //             colorArray.push('rgb(243, 243, 244)', 'rgb(216, 216, 217)');
    //             x--;
    //             if (x === 0){
    //                 y++;
    //                 x = widthInput / 2;
    //             }
    //         } else {
    //             colorArray.push('rgb(216, 216, 217)', 'rgb(243, 243, 244)');
    //             x--;
    //             if (x === 0){
    //                 y++;
    //                 x = widthInput / 2;
    //             }
    //         }
    //     }
    // } else { 
    //     for (let i = 0; i < halfArea; i++) {  
    //         colorArray.push('rgb(216, 216, 217)', 'rgb(243, 243, 244)'); 
    //     }

    // }
    // while (colorArray.length > area) {
    //     colorArray.pop();
    // }

    let newImage = {
        title: title,
        height: heightInput,
        width: widthInput,
        colors: colorArray,
    };
    return newImage;    
}

export function updateImage(imageObject, colorArray) {
    imageObject.colors = colorArray;
    return imageObject;
}

export function renderImage(imageObject) {
    const canvas = document.getElementById('canvas');
    canvas.style.gridTemplateColumns = `repeat(${imageObject.width}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${imageObject.height}, 1fr)`;
    const colorArray = imageObject.colors;
    const area = imageObject.height * imageObject.width;
    for (let i = 0; i < area; i++) {
        const pixel = document.createElement('div');
        pixel.style.backgroundColor = colorArray[i];
        pixel.classList.add('pixel-div');
        if (imageObject.height === imageObject.width) {
            pixel.style.width = `${Math.round(500 / imageObject.height)}px)`;
            pixel.style.height = `${Math.round(500 / imageObject.height)}px`;
            canvas.style.height = `${(imageObject.height * Math.round(500 / imageObject.height))}px`;
            canvas.style.width = `${(imageObject.width * Math.round(500 / imageObject.height))}px`;
        } else if (imageObject.height > imageObject.width) {
            pixel.style.width = `${Math.round(500 / imageObject.height)}px`;
            pixel.style.height = `${Math.round(500 / imageObject.height)}px`;
            canvas.style.height = `${Math.round(imageObject.height * Math.round(500 / imageObject.height))}px`;
            canvas.style.width = `${Math.round(imageObject.width * Math.round(500 / imageObject.height))}px`;
        } else {
            pixel.style.width = `${Math.round(500 / imageObject.width)}px`;
            pixel.style.height = `${Math.round(500 / imageObject.width)}px`;
            canvas.style.width = `${Math.round(imageObject.width * Math.round(500 / imageObject.width))}px`;
            canvas.style.height = `${Math.round(imageObject.height * Math.round(500 / imageObject.width))}px`;
        }
        
        canvas.append(pixel);  
    }
}
