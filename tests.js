QUnit.test( "hello test", function( assert ) {
    var time = convertMoneyToTime(5);
    assert.ok( time == "28 minutes" );
});
