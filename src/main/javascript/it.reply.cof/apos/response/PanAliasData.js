class PanAliasData{

    constructor() {
        /*
        *no args constructor
         **/
    }

    #panAlias;
    #panAliasRev;
    #panAliasExpDate;
    #panAliasTail;
    #MAC;


    get panAlias() {
        return this.#panAlias;
    }

    set panAlias(panAlias) {
        this.#panAlias = panAlias;
    }

    get panAliasRev() {
        return this.#panAliasRev;
    }

    set panAliasRev(panAliasRev) {
        this.#panAliasRev = panAliasRev;
    }

    get panAliasExpDate() {
        return this.#panAliasExpDate;
    }

    set panAliasExpDate(panAliasExpDate) {
        this.#panAliasExpDate = panAliasExpDate;
    }

    get panAliasTail() {
        return this.#panAliasTail;
    }

    set panAliasTail(panAliasTail) {
        this.#panAliasTail = panAliasTail;
    }

    get MAC() {
        return this.#MAC;
    }

    set MAC(MAC) {
        this.#MAC = MAC;
    }

    toString(){
        return "PanAlias: " + this.#panAlias + " PanAliasRev: " + this.#panAliasRev + " PanAliasExpDate: " + this.#panAliasExpDate
                + " PanAliasTail: " + this.#panAliasTail + "\nMAC: " + this.#MAC;
    }

}