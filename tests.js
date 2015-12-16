QUnit.test( "Check money to time conversion works", function( assert ) {
  var time = convertMoneyToSeconds(5);
  assert.equal( time, 1699 );
});

QUnit.test( "Replace a substring", function( assert ) {
  var before = "£1000 a week";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "4 days a week");
});

QUnit.test( "Match a number with decimals", function( assert ) {
  var before = "£1000.00";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "4 days");
});

QUnit.test( "Match a number with decimals as a substring", function( assert ) {
  var before = "£1000.00 a week";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "4 days a week");
});

QUnit.test( "Correctly parse a number with commas", function( assert ) {
  var before = "£10,000";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "a month");
});

QUnit.test( "Handle K", function( assert ) {
  var before = "£100K per year";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "a year per year");
});

QUnit.test( "Handle k", function( assert ) {
  var before = "£100k per year";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "a year per year");
});

QUnit.test( "Handle M", function( assert ) {
  var before = "£100M per year";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "1076 years per year");
});

QUnit.test( "Handle m", function( assert ) {
  var before = "£100m per year";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "1076 years per year");
});

QUnit.test( "Handle £25.5M", function( assert ) {
  var before = "£25.5M per year";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "269 years per year");
});
