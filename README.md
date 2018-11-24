Experiment using Typescript and the ES6 Proxy object to create a simple as possible one-way binding from object in code to the DOM. 

**Usage**

````html
<div id="app">
  <div data-cm="someNumber"></div>
  <div data-cm="someText"></div>
</div>
````

````typescript
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

model.someText = "Hello world!";
````
