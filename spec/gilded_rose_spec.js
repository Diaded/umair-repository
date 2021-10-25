describe("Gilded Rose", function() {

  describe("Check for proper types", () => {
      it("if proper types are not present throw error", () => {
        items = []
        items.push(new Item('', '', ''))
        expect(update_quality).toThrow(typeError)
      })

      it('if quality is less then 0 error is throw', () => {
        items = []
        items.push(new Item('', 10, -1))
        expect(update_quality).toThrow(qualityError)
      })
    })

});
