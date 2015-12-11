/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function ListModel(items) {
    // Internal instance variables
    this._items = items;
    this._selectedIndex = -1;

    // Seems that we are specifying an event,
    // so that later we can say that the "itemAdded"
    // event happened, which automatically includes
    // "this" object
    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.selectedIndexChanged = new Event(this);
}

ListModel.prototype = {
    getItems : function() {
        // looks like this copies data over
        return [].concat(this._items);
    },

    addItem : function (item) {
        this._items.push(item);
        this.itemAdded.notify({ item : item });
    },

    removeItemAt : function (index) {
        var item;

	// retrieve the item at the index
        item = this._items[index];
        // remove the item at the index, nothing extra
        this._items.splice(index, 1);
        // let this ListModel know that the item has been removed
        this.itemRemoved.notify({ item : item });
        // a way of indicating that the currently selected item is kaput
        if (index === this._selectedIndex) {
            this.setSelectedIndex(-1);
        }
    },

    getSelectedIndex : function () {
        return this._selectedIndex;
    },

    setSelectedIndex : function (index) {
        var previousIndex;

        // find the previously selected index
        previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        // a way of indicating that the old index has changed from this
        this.selectedIndexChanged.notify({ previous: previousIndex });
    }
};

// TODO: Pick up where I left off, at the Observer pattern
