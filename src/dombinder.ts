export default class DomBinder {
    private elements: Array<Element> 

    private static _instance: DomBinder = null;
    private constructor(rootElement: string) {
        this.loadDomElements(rootElement);
    }
    static initiate(rootElement: string) {
        return this._instance === null ? this._instance = new DomBinder(rootElement) : this._instance; 
    }

    watch<T>(data: T): T {
        this.setInitialDom(data);
        let handler = {
            set: (obj: any, prop: string, value: any): boolean => {
                this.elements.forEach(el => {
                    if(this.hasBindingTo(el, prop)) {
                        el.innerHTML = value;
                    }
                })
                obj[prop] = value;
                return true;
            }
        }
        return new Proxy(data, handler);
    }

    private loadDomElements(rootElement: string): any {
        let root = document.querySelector(rootElement);
        this.elements = Array.from(root.querySelectorAll('[data-cm]'))
    }

    private hasBindingTo = (element: Element, key: string) => {
        return element.getAttribute('data-cm') !== null && 
                element.getAttribute('data-cm').toLowerCase() === key.toLowerCase();
    }

    private setInitialDom(data: any) {
        Object.keys(data).forEach(key => {
            this.elements.filter(el => this.hasBindingTo(el, key)).forEach(el => {
                el.innerHTML = data[key];
            })
        })
    }
}