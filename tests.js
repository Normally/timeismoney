QUnit.test( "hello test", function( assert ) {
    var time = convertMoneyToTime(5);
    assert.ok( time == "28 minutes" );
});

QUnit.test( "replace test", function( assert ) {
  var before = "£1000 a week";
  var after  = replaceMoneyWithTime(before);
  assert.equal(after, "4 days a week");
});
