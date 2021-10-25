describe("Gilded Rose", function() {

  describe("Check for proper types", () => {
      it("if proper types are not present throw error", () => {

        items = []
        const error = Error('Improper types are present Item keys')
        items.push(new Item('', '', ''))

        expect(update_quality).toThrow(error)
      })
    })

});
