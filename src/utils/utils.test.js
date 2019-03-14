import Utils from './utils';

describe('should return a range of numbers', () => {
  it('should return a range of numbers', () => {

    expect(Utils.range(1,4)).toEqual([1,2,3,4]);
  });

  it('should return a range of numbers', () => {

    expect(Utils.range(4)).toEqual([0, 1,2,3,4]);
  });

  it('should return empty array', () => {

    expect(Utils.range(10, 10)).toEqual([]);
  });

  it('should return countdow', () => {

    expect(Utils.range(3, 1, -1)).toEqual([3, 2, 1]);
  });


  it('should return a range of numbers not including the last one', () => {

    expect(Utils.range(1,4, 1, false)).toEqual([1,2,3]);
  });

  it('should return a range of numbers, step 2', () => {

    expect(Utils.range(0, 10, 2)).toEqual([0,2,4,6,8,10]);
  });

});

describe('should return a cleaned value base on the prodived cleaner function, or default if invalid', () => {
  it('return 10 as integer casted from string', () => {
    expect(Utils.cleanValue("10", parseInt, null)).toEqual(10);
  });

  it('return 10 as integer casted from float', () => {
    expect(Utils.cleanValue(10.0, parseInt, null)).toEqual(10);
  });

  it('return defaultValue, because cleaner failed', () => {
    expect(Utils.cleanValue("a", parseInt, 5)).toEqual(5);
  });

  it('return defaultValue, because cleaner generated an error', () => {
    expect(Utils.cleanValue("a", () => ([1].pap()), 5)).toEqual(5);
  });

  it('return option1, because cleaner failed', () => {
    expect(Utils.cleanValue("option1", (value)=> (
      (["option1", "option2"].includes(value))? value: null
    ), "option2")).toEqual("option1");
  });

  it('return defaultValue, because cleaner failed', () => {
    expect(Utils.cleanValue("x", (value)=> (
      (["option1", "option2"].includes(value))? value: null
    ), "option2")).toEqual("option2");
  });


});