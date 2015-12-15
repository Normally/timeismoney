QUnit.test( "hello test", function( assert ) {
    var time = convertMoneyToTime(5);
    assert.ok( time == "28 minutes" );
});

QUnit.test( "replace test", function( assert ) {
  var node = "<p>£3</p>";
  var after = replaceMoneyWithTimeIfNeeded(node);
  console.log(after);
  assert.equal(after, "2 days");
});
