class ConfirmRequest extends GeneralRequest{

    #accountingMode;
    #closeOrder;
    #options;

    get accountingMode() {
        return this.#accountingMode;
    }

    set accountingMode(value) {
        this.#accountingMode = value;
    }

    get closeOrder() {
        return this.#closeOrder;
    }

    set closeOrder(value) {
        this.#closeOrder = value;
    }

    get options() {
        return this.#options;
    }

    set options(value) {
        this.#options = value;
    }

    toString() {
        return super.toString() + "\nAccountingMode: " + this.#accountingMode + " CloseOrder: " + this.#closeOrder + " Options: " + this.#options;
    }

}