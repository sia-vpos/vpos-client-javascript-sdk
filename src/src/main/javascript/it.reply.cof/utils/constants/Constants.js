export const CVV2 = "CVV2";
export const UTF8 = "UTF-8";
export const KEY_SEPARATOR = ".";
export const DEFAULT = "DEFAULT";
export const CONTACTPOINTS_SEPARATOR = "\\|";
export const TIMESTAMP_PATTERN = "yyyy-MM-dd'T'HH:mm:ss.SSS";
export const TIMESTAMP_PATTERN_VALIDATOR_AUTHORIZE = "yyyy-MM-dd'T'HH:mm:ss";
export const TIMESTAMP_PATTERN_WS = "^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})";
export const REFNUM_PATTERN = "yyyyMMdd";
export const MAC_VALIDATION = "true";
export const PANALIAS_ERROR = "ERROR";
export const PANALIAS_NULL = "NULL";
export const ALIAS_NETWORK = "98";
export const EXP_DATE_FORMAT = "yyMM";
export const INVALID_PID = "0";

const StatusCode = object.freeze({
    CONFIRMED: Symbol("000"),
    NO_PID: Symbol("100"),
    PID_EXPIRED_INVALID: Symbol("200"),
    STEP2_3DS: Symbol("300"),
    FAILED: Symbol("900")
});

const TransactionType = object.freeze({
    AUTHORIZE: Symbol("authorize"),
    CANCEL:  Symbol("cancel"),
    CONFIRM: Symbol("confirm"),
    REFUND: Symbol("refund"),
    VERIFY: Symbol("verify"),

    parse(field){
       var  notPresent = true;

       this.keys().forEach(function(key){
        if(field != null && field === key){
            notPresent = false;
        }
       })

    }

});

const Currency  = object.freeze({
    EUR : Symbol("978"),


    getCurrencyName(code) {
        var currName = "";

        this.keys().forEach(function(curr){
            if (code != null && code === curr) {
                currName = curr.name();
            }
        })
        return currName;
    },

    parse(field) {
        var notPresent = true;

        this.keys().forEach(function(key){
            if(field != null && field === key){
                notPresent = false;
            }
        })
        return notPresent;
    },

   getCurrency(field) {
       this.keys.forEach(function(curr){
            if (field != null && field === curr) {
                return curr;
            }
        })
        return Currency.EUR;
    }

});

 const AccountingMode = object.freeze({
     DEFERRED:  Symbol("D"),
     IMMEDIATE: Symbol("I"),

    parse(field) {
        var notPresent = true;
        this.keys.forEach(function(acc){
        if (field != null && field === acc ) {
            notPresent = false;
        }
    })
    return notPresent;
    }

 });


const Lang = object.freeze({
    ITALIAN : Symbol("ITA"),
    ENGLISH : Symbol("EN"),

    parse(field) {
        var isPresent = false;
        this.keys.forEach(function(lg){
            if (field != null && field === lg) {
                isPresent = true;
            }
        })
        return isPresent;
    }

});

const TransactionStatus = object.freeze({
    CONFIRMED : Symbol("00"),
    AUTHORIZED: Symbol("01"),
    AUTHORIZATION_IN_PROGRESS: Symbol("02"),
    REFUNDED: Symbol("03"),
    CANCELLED: Symbol("04"),
    UNAUTHORIZED: Symbol("05"),
    REJECTED: Symbol("06"),
    ERROR : Symbol("07"),
    AUTH_3DS_DONE : Symbol("08"),
    AUTH_3DS_IN_PROGRESS : Symbol("09"),
    TO_BE_CONFIRMED : Symbol("10"),
    TO_BE_REFUNDED : Symbol("11"),
    REFUND_FAILED : Symbol("12"),
    CANCEL_FAILED: Symbol("13"),


    getStatusName(code) {
        var ts = "";
        this.keys.forEach(function(status){
            if (code != null && code === status) {
                ts = status.name();
            }
        })
        return ts;
    },

    parse(field) {
        var isPresent = false;
        this.keys.forEach(function(status){
            if (field != null && field === status) {
                isPresent = true;
            }
        })
        return isPresent;
    }

});


