export const hasAValidAccount = (user) => {
    if(user) {
        const { is_influencer, is_creator, is_businessowner } = user.account 
        return  is_influencer || is_creator || is_businessowner; 
    }
}
export const moneyStandard = (val) => val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

