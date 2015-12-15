QUnit.test( "Check money to time conversion works", function( assert ) {
    var time = convertMoneyToTime(5);
    assert.ok( time == "28 minutes" );
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
