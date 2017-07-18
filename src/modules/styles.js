// returns the react style object for a gradient background
export const gradientBackground = (primaryColor, secondaryColor) => {
  return {
    background: secondaryColor, /* For browsers that do not support gradients */
    background: `-webkit-linear-gradient(left top, ${primaryColor}, ${secondaryColor})`, /* For Safari 5.1 to 6.0 */
    background: `-o-linear-gradient(bottom right, ${primaryColor}, ${secondaryColor})`, /* For Opera 11.1 to 12.0 */
    background: `-moz-linear-gradient(bottom right, ${primaryColor}, ${secondaryColor})`, /* For Firefox 3.6 to 15 */
    background: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})`, /* Standard syntax */
  }
}
