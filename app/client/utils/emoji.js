import emojisSheet from '../libs/emojisSheet'

export default class EmojisParser {
  constructor(input) {
    this.input = input;
  }

  parse() {
    let newValue = this.input;
    for (const key in emojisSheet) {
      const details = emojisSheet[key];
      if (newValue.includes(`:${key}:`)) {
        const unicode = details.unicode;
        newValue = newValue.replace(`:${key}:`, this.convert(unicode));
      }
    }

    return newValue;
  }

  convert(unicode) {
    if(unicode.indexOf("-") > -1) {
      let parts = [];
      let s = unicode.split('-');
      for (let i = 0; i < s.length; i++) {
        let part = parseInt(s[i], 16);
        if (part >= 0x10000 && part <= 0x10FFFF) {
          let hi = Math.floor((part - 0x10000) / 0x400) + 0xD800;
          let lo = ((part - 0x10000) % 0x400) + 0xDC00;
          part = (String.fromCharCode(hi) + String.fromCharCode(lo));
        } else {
          part = String.fromCharCode(part);
        }
        parts.push(part);
      }

      return parts.join('');
    } else {
      let s = parseInt(unicode, 16);
      if (s >= 0x10000 && s <= 0x10FFFF) {
        let hi = Math.floor((s - 0x10000) / 0x400) + 0xD800;
        let lo = ((s - 0x10000) % 0x400) + 0xDC00;
        return (String.fromCharCode(hi) + String.fromCharCode(lo));
      } else {
        return String.fromCharCode(s);
      }
    }
  }
}
