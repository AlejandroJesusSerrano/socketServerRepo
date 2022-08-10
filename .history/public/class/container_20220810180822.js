const fs = require('fs');
const encoding = "utf-8";

class Container {
    constructor (path) {
        
        this.filePath = path;
        this.createFirstFile();
        const products = fs.readFileSync(this.filePath, encoding);
        this.container = JSON.parse(products)
    }
    
    createFirstFile(){
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]');
        }
    };


    saveAll (products) {
        const dataToString = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.filePath, dataToString, encoding);
    }

    getAll() {
        return this.container
    };

    save (message) {
            this.container.push(message);
            this.saveAll(this.container);
    };

    update = async (id, product) => {
        try {
            const index = await this.container.findIndex(prod => prod.id == id);
            
            this.container[index] = product;
            this.saveAll(this.container);
            return product;
            } catch (err) {
            
            console.log ( 'lo sentimos a habido un error', err);
        }
    };

    
    getById  = async (id) => {
        try { 
            const product = await this.container.find(product => product.id == id);
            if(id <= 0 || id > this.container.length || isNaN(id)){
                const notFind = {Error: "Producto no encontrado"};
                return notFind;            
            }
            return product
        } catch (err) {
            console.log ('Lo sentimos ha habido un error', err);
        };
    };
            

    getAll() {
            return this.container
    };

    getRandom = async() =>{
        try{
            const random = Math.floor(Math.random() * this.container.length);
            return this.container[random];
        } catch (err) {
            console.log ('lo sentimos a habido un error', err);
        };
    };

    deleteById = async (id) => {
        try {
            const filtered = this.container.filter(product => product.id !== id);
            this.container = filtered;
            this.saveAll(filtered);
        } catch (error) {
            console.log ('Lo sentimos ha habido un error', error);
        };
    };
        

    deleteAll = async () => {
        try {
            this.container = [];
            this._saveAll([]);
        } catch (error) {
            console.log ('Lo sentimos ha habido un error', error);
        }

    };
};


module.exports = Container;

