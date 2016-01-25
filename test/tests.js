QUnit.test( "Check money to time conversion works", function( assert ) {
  var time = TIM.convert.moneyToTime(5);
  assert.equal( time, "6min" );
});

QUnit.test( "Replace a substring", function( assert ) {
  var before = "£1000 a week";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "2.5d a week");
});

QUnit.test( "Match a number with decimals", function( assert ) {
  var before = "£1000.00";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "2.5d");
});

QUnit.test( "Match a number with decimals as a substring", function( assert ) {
  var before = "£1000.00 a week";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "2.5d a week");
});

QUnit.test( "Correctly parse a number with commas", function( assert ) {
  var before = "£10,000";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "1mo");
});

QUnit.test( "Handle K", function( assert ) {
  var before = "£100K per year";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "1yr per year");
});

QUnit.test( "Handle k", function( assert ) {
  var before = "£100k per year";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "1yr per year");
});

QUnit.test( "Handle M", function( assert ) {
  var before = "£100M per year";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "1000yr per year");
});

QUnit.test( "Handle m", function( assert ) {
  var before = "£100m per year";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "1000yr per year");
});

QUnit.test( "Handle £25.5M", function( assert ) {
  var before = "£25.5M per year";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "250yr per year");
});

QUnit.test( "Match a number with decimals", function( assert ) {
  var before = "£1000.00";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "2.5d");
});

QUnit.test( "Match a small number", function( assert ) {
  var before = "£1.50";
  var after  = TIM.convert.replaceMoneyWithTime(before);
  assert.equal(after, "2min");
});

QUnit.test( "Allow the salary to be changed", function(assert) {
  var time = TIM.convert.moneyToTime(5);
  assert.equal( time, "6min" );
  TIM.settings.values.yearlyWage = 100;
  console.log(TIM.settings.values);
  var time = TIM.convert.moneyToTime(5);
  assert.equal( time, "2.5wk" );
});

