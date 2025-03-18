using Desktop_Lib;

namespace Desktop_Test
{
    public class ValidatorTest
    {
        [TestCase("string")]
        [TestCase("")]
        [TestCase("123.123")]
        [TestCase("123,123")]
        public void ValidateIntReturnsFalseWhenNotGivenAnInteger(string input)
        {
            Assert.That(Validator.ValidateInt(input), Is.False);
        }

        [TestCase("-12")]
        [TestCase("0")]
        [TestCase("234")]
        public void ValidateIntReturnsTrueWhenGivenAnInteger(string input)
        {
            Assert.That(Validator.ValidateInt(input), Is.True);
        }

        [TestCase("string")]
        [TestCase("12:60")]
        [TestCase("24:00")]
        [TestCase("12:")]
        [TestCase("12")]
        [TestCase(":34")]
        [TestCase("12:34:56")]
        public void ValidateTimeReturnsFalseWhenNotGivenAValidTime(string input)
        {
            Assert.That(Validator.ValidateTime(input), Is.False);
        }

        [TestCase("12:34")]
        [TestCase("00:00")]
        [TestCase("23:59")]
        public void ValidateTimeReturnsTrueWhenGivenAValidTime(string input)
        {
            Assert.That(Validator.ValidateTime(input), Is.True);
        }
    }
}
