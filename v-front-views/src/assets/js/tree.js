////////////////////////////////////////////////////////
////////////////// T M P L Tree ///////////////////////
//////////////////////////////////////////////////////
export default class Tree{

    constructor(start_key ,tmpl_pack, lib_pack){
        // if(startkey) this.start = startkey;
        // if(keys) this.keys = keys;
        // if(lib_pack) this.lib_pack = lib_pack;
        // this.tmpl_pack = tmpl_pack;
        console.log('___________');
        console.log(start_key);
        console.log(tmpl_pack);
        console.log(lib_pack);
        console.log('___________');

        this.mappedKeyId = [];

        this.start = start_key;
        this.tmpl = this.parseTmplObj(tmpl_pack);
        if(lib_pack) 
            this.tmpl_lib = this.parseLibObj(lib_pack);
    }

    async createText(){
        console.log(this.lib_pack);
        let result = await this.templateParse(this.tmpl[this.start], this.tmpl);
        if(this.tmpl_lib)
            result = await this.libraryKeyParse(result, this.tmpl_lib);
        return result;
    }
    // ["test".toUpperCase()]() {
    //     alert("PASSED!");
    // }

    rand(items){
        return items[~~(Math.random() * items.length)];
    }

    parseTmplObj(json){
        console.log(json);
        var tmpl_arr= json.map((item)=>{
            var obj = {};
            obj[item['keyword']] = [];
            return obj;
        });
        var tmpl = {};
        Array.prototype.forEach.call(tmpl_arr,function(elem) {
           var keys = Object.keys(elem);
           tmpl[keys[0]] = elem[keys[0]];
        });
        for(var i=0; i<json.length; i++){
            var key = json[i]['keyword'];
            var val = json[i]['val'];
            console.log(key);
            console.log(val);
            tmpl[key].push(val);
        }
        return tmpl;
    }
    parseLibObj(json){
        var lib_arr= json.map((item)=>{
            var obj = {};
            obj[item['key']] = [];
            return obj;
        });
        var lib = {};
        Array.prototype.forEach.call(lib_arr,function(elem) {
           var keys = Object.keys(elem);
           lib[keys[0]] = elem[keys[0]];
        });
        for(var i=0; i<json.length; i++){
            var key = json[i]['key'];
            var val_arr = json[i]['values'];
            console.log(key);
            console.log(val_arr);
            for(var j=0; j<val_arr.length; j++){
                lib[key].push(val_arr[j].value);
            }
        }
        return lib;
    }

    templateParse(e, obj){
        var regexp = /<\w*>/ig;
        console.log('- tmpl: '+e);

        if ( !e )
            return null;

        if ( Array.isArray(e) ){
            if(e.length == 0)
                return null;
            else{
                let promis = null;
                do{
                    let min = 0,
                        max = e.length-1;
                    var rand = min + Math.floor(Math.random() * (max + 1 - min));
                    promis = this.templateParse( e[rand], obj);
                    e.splice(rand,1);
                    // promis = this.templateParse( this.rand(e), obj);
                }while(!promis && e.length)

                if(!promis) return null;
                return promis;
            }
        }
        else{
            if( /<\w*>/i.test(e) ){
                var result = '';
                var last_pos = 0;
                let foo;
                while ( foo = regexp.exec(e)) {
                    result += e.substring(last_pos,foo.index);
                    
                    var ind = foo[0].replace(/[<>]*/g,'');
                    result += this.templateParse( obj[ind], obj);
                    last_pos = regexp.lastIndex;
                    // console.log('[ result ]: '+result);
                }
                result += e.substring(last_pos,e.length);
                return result;
            }else{
                return e;
            }
        }
    }
    libraryKeyParse(e, lib){
        var regexp = /\[\w*\]/ig;
        console.log('- lib: '+e);

        if ( Array.isArray(e) ){
            if(e.length == 0)
                return null;
            else{
                let promis = null;
                do{
                    let min = 0,
                        max = e.length-1;
                    var rand = min + Math.floor(Math.random() * (max + 1 - min));
                    promis = this.libraryKeyParse( e[rand], lib);
                    e.splice(rand,1);
                    // promis = this.templateParse( this.rand(e), obj);
                }while(!promis && e.length)

                if(!promis) return null;
                return promis;
            }
        }
        // if ( Array.isArray(e) ){
        //     return this.libraryKeyParse( this.rand(e), lib);
        // }
        else{
            if( /\[\w*\]/i.test(e) ){
                var result = '';
                var last_pos = 0;
                let foo;
                while ( foo = regexp.exec(e)) {
                    result += e.substring(last_pos,foo.index);
                    
                    var ind = foo[0].replace(/[\[\]]*/g,'');
                    result += this.libraryKeyParse( lib[ind], lib );
                    last_pos = regexp.lastIndex;
                    console.log('[ result ]: '+result);
                }
                result += e.substring(last_pos,e.length);
                return result;
            }else{
                return e;
            }
        }
    }
}


// export default {
//     Tree
// }
// export default Tree;
// module.exports = Tree;