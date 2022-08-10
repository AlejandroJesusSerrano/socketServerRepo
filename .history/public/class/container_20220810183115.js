const fs = require('fs');
const encoding = "utf-8";

class Container {
    constructor (path) {
        
        this.filePath = path;
        this.createFirstFile();
        const data = fs.readFileSync(this.filePath, encoding);
        this.container = JSON.parse(data)
    }
    
    createFirstFile(){
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]');
        }
    };


    saveAll (data) {
        const dataToString = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.filePath, dataToString, encoding);
    }

    getAll() {
        return this.container
    };

    save = async (item) => {
        const lastId = this.container.length; 

        try {
            item.id = lastId+1;
            this.container.push(item);
            this.saveAll(this.container);
            return item;
        } catch (error) {
            console.log (error);
        };
    };

    update = async (id, item) => {
        try {
            const index = await this.container.findIndex(itm => itm.id == id);
            
            this.container[index] = item;
            this.saveAll(this.container);
            return item;
            } catch (err) {
            
            console.log ( 'lo sentimos a habido un error', err);
        }
    };

    
    getById  = async (id) => {
        try { 
            const item = await this.container.find(item => item.id == id);
            if(id <= 0 || id > this.container.length || isNaN(id)){
                const notFind = {Error: "item no encontrado"};
                return notFind;            
            }
            return item
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
            const filtered = this.container.filter(item => item.id !== id);
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

