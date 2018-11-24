import DomBinder from './../src/dombinder'

interface PageModel {
    someNumber: number;
    someText: string;
}

let initialData: PageModel = {
    someNumber: 1000,
    someText: "Hello word"
}

let dom = DomBinder.initiate('#app');

let model = dom.watch(initialData);

// Update number
setInterval(() => {
    model.someNumber++;
},1000)

// Set new text
model.someText = "Hello world!";

