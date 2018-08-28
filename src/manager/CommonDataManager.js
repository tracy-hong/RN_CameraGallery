
const Realm=require('realm');
export default class CommonDataManager {

    static myInstance = null;


    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }

        return CommonDataManager.myInstance;
    }

    initDatabase() {
        const BankInfoSchema={
            name:'BankInfoData',
            primaryKey:'id',
            properties:{
                id:'string', //卡号
                cardName:'string',   // 银行名称
                cardNumLast:'string',// 银行卡后四位
                cardMoney:'string',  // 额度
                cardRepayDay:'string',// 还款日
                cardBillDay:'string', // 账单日
            }
        };

        return new Realm({schema:[BankInfoSchema]});
    }
    
}
