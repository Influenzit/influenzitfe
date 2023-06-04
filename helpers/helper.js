export const hasAValidAccount = (user) => {
    if(user) {
        const { is_influencer, is_creator, is_businessowner } = user.account 
        return  is_influencer || is_creator || is_businessowner; 
    }
}
export const moneyStandard = (val) => Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const getQueryString = val => {
    if(val.indexOf("?") > -1) {
        return val.substring(val.indexOf("?"));
    }
    return "";
}
export const numberFormatter = (number) => {
    if((number > 999) && (number < 1000000)) {
        return `${(number/1000).toFixed(1)}K`
    }
    if(number > 999999) {
        return `${(number/1000000).toFixed(1)}M`;
    }
    return number
}
export const getTooltipPosition = (el, tooltip, position, gap) => {
    const { top: elTop, left: elLeft, height: elHeight, width:  elWidth } = el.getBoundingClientRect();
    const { width: tooltipWidth, height: tooltipHeight } = tooltip.getBoundingClientRect();
    console.log(tooltip)
    let correctedLeft = elLeft;
    let correctedTop = elTop;
    switch (position) {
        case 'top': {
           correctedLeft = correctedLeft + elWidth / 2 -  tooltipWidth / 2;
           correctedTop = correctedTop - gap - tooltipHeight;
           break;
        }
        case 'left': {
           correctedLeft = elLeft - gap - tooltipWidth;
           correctedTop = correctedTop + elHeight / 2 - tooltipHeight / 2;
           break;
        }
        case 'right': {
           correctedLeft = correctedLeft + elWidth + gap;
           correctedTop = correctedTop + elHeight / 2 - tooltipHeight / 2;
           break;
        }
        case 'bottom':
        default:
           correctedLeft = correctedLeft + elWidth / 2 - tooltipWidth / 2;
           correctedTop = correctedTop + elHeight + gap;
        }
    return {
        left: correctedLeft,
        top: correctedTop,
    };
 }
