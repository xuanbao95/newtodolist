function Validation() {
    this.checkEmpty = function (input, mess) {
        if (input === "") {
            alert(mess);
        }
    }
}