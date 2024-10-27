export const leveldatas = ["12", "12324", "231234", "41233412", "41323134132", "234234123123142"];
export const difficulty = (level: number) => {
  switch (level) {
    case 1: return 1500;
    case 2: return 1000;
    case 3: return 500;
    case 4: return 300;
    case 5: return 200;
    default: return 1000;
  }
};
