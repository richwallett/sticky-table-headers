// Generated by CoffeeScript 2.5.1
(function() {
  var TableScrollManager;

  TableScrollManager = class TableScrollManager {
    constructor(container, id) {
      this.container = $(container);
      this.id = id;
      this.headerTable = this.container.find('.scrolling_header_table');
      this.contentTable = this.container.find('.original_table_container table');
    }

    perform() {
      this.enableContainerScrolling();
      this.cloneAndAppendTableHeader();
      this.alignTableWidth();
      this.hideOriginalThead();
      this.setHeaderWidth();
      return this._handleWindowResize();
    }

    enableContainerScrolling() {
      var context, didScroll, headerOffset, scrollElement, scrollMax;
      // Enable overflow on selected table
      this.headerTable.next('.container').addClass('enable_scroll');
      // Calculate offsets and heights for scroll behavior
      scrollElement = this.container.find('.scroll');
      headerOffset = scrollElement.offset().top;
      scrollMax = scrollElement.height() - scrollElement.find('thead').height();
      console.log(scrollElement);
      // Initial fixing of header to handle page loads where the
      // page is already scrolled
      this.toggleScrollBasedOnPosition(headerOffset, scrollMax);
      // Add event listener to watch scroll and toggle classes
      didScroll = false;
      window.addEventListener('scroll', () => {
        return didScroll = true;
      });
      context = this;
      return setInterval(() => {
        if (didScroll) {
          didScroll = false;
          return context.toggleScrollBasedOnPosition(headerOffset, scrollMax);
        }
      }, 1);
    }

    toggleScrollBasedOnPosition(headerOffset, scrollMax) {
      if (headerOffset <= window.pageYOffset && (headerOffset + scrollMax) >= window.pageYOffset) {
        this.container.find('.scrolling_header_table').addClass('fixed');
        this.headerTable.find('caption').hide();
      } else {
        this.container.find('.scrolling_header_table').removeClass('fixed');
        this.headerTable.find('caption').show();
      }
      return this._adjustHorizontalTableScroll();
    }

    _adjustHorizontalTableScroll() {
      var adjustment, baseShift, pixelsScrolledLeft;
      if (this.headerTable.hasClass('fixed')) {
        baseShift = this.contentTable.offset().left;
        // baseShift is initial distance from left viewport to table edge
        pixelsScrolledLeft = $(window).scrollLeft();
        adjustment = -(pixelsScrolledLeft - baseShift);
        return this.headerTable.css({
          'left': adjustment
        });
      } else {
        // Reset settings if table scrolling is not engaged
        return this.headerTable.css({
          'left': ''
        });
      }
    }

    cloneAndAppendTableHeader() {
      var caption, captionClone, clone, orig, origParent;
      // Original thead becomes invisible and we show this cloned header
      // in a new table on top of the invisible thead
      orig = this.contentTable.find('thead');
      origParent = orig.closest('table');
      clone = orig.clone();
      orig.prependTo(this.headerTable);
      clone.prependTo(origParent);
      caption = this.contentTable.find('caption');
      captionClone = caption.clone();
      caption.prependTo(this.headerTable);
      return captionClone.prependTo(origParent);
    }

    hideOriginalThead() {
      this.contentTable.find('thead').addClass('invisible');
      return this.contentTable.find('caption').addClass('invisible');
    }

    alignTableWidth() {
      // Ensure width does not change
      return this.headerTable.width(this.currentContentTableWidth());
    }

    currentContentTableWidth() {
      var width;
      // width = @fullWidth ?
      //   @container.find('.original_table_container table').parent().width() :
      //   @container.find('.original_table_container table').outerWidth()
      width = this.fullWidth ? this.container.find('.original_table_container table').parent().width() : this.container.find('.original_table_container table').outerWidth();
      return width;
    }

    setHeaderWidth() {
      var contentTableHeaders, headerTableHeaders;
      // Set individual widths - may need to expand
      headerTableHeaders = this.headerTable.find('thead tr:first-child th');
      contentTableHeaders = this.contentTable.find('thead tr:first-child th');
      return $.each(headerTableHeaders, function(i) {
        $(this).width(contentTableHeaders.eq(i).width());
        return $(this).height(contentTableHeaders.eq(i).height());
      });
    }

    _handleWindowResize() {
      return window.addEventListener('resize', () => {
        return this._adjustHorizontalTableScroll();
      });
    }

  };

  document.addEventListener('DOMContentLoaded', function() {
    return $.each($('.scrolling_table_container'), function(i, tableContainer) {
      return new TableScrollManager(tableContainer, i).perform();
    });
  });

}).call(this);
