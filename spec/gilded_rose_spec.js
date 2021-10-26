describe("Gilded Rose", function() {

  describe("Check for proper types", () => {
      it("if proper types are not present throw error", () => {
        items = []
        items.push(new Item('', '', ''))
        expect(update_quality).toThrow(typeError)
      })

      it('if quality is less then 0 throw error', () => {
        items = []
        items.push(new Item('', 10, -1))
        expect(update_quality).toThrow(qualityError)
      })
    })

    describe('Dealing with back stage passes', () => {
      it("quality of backstage passes should increase when sell in days get smaller", () => {
        items = []
        let sell_in = 25
        let quality = 50
        items.push(new Item('Backstage passes', sell_in, quality))

        update_quality()

        expect(items[0].quality).toEqual(51)

      })

    })

});
