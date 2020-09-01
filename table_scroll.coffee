class TableScrollManager
  constructor: (container, id) ->
    @container    = $(container)
    @id           = id
    @headerTable  = @container.find('.scrolling_header_table')
    @contentTable = @container.find('.original_table_container table')

  perform: ->
    @enableContainerScrolling()
    @cloneAndAppendTableHeader()
    @alignTableWidth()
    @hideOriginalThead()
    @setHeaderWidth()
    @_handleWindowResize()

  enableContainerScrolling: ->
    # Enable overflow on selected table
    @headerTable.next('.container').addClass('enable_scroll')

    # Calculate offsets and heights for scroll behavior
    scrollElement = @container.find('.scroll')
    headerOffset  = scrollElement.offset().top
    scrollMax     = scrollElement.height() - scrollElement.find('thead').height()
    console.log(scrollElement)

    # Initial fixing of header to handle page loads where the
    # page is already scrolled
    @toggleScrollBasedOnPosition(headerOffset, scrollMax)

    # Add event listener to watch scroll and toggle classes
    didScroll = false
    window.addEventListener 'scroll', =>
      didScroll = true

    context = this
    setInterval =>
      if didScroll
        didScroll = false
        context.toggleScrollBasedOnPosition(headerOffset, scrollMax)
    , 1

  toggleScrollBasedOnPosition: (headerOffset, scrollMax) ->
    if (headerOffset <= window.pageYOffset && (headerOffset + scrollMax) >= window.pageYOffset)
      @container.find('.scrolling_header_table').addClass('fixed')
      @headerTable.find('caption').hide()
    else
      @container.find('.scrolling_header_table').removeClass('fixed')
      @headerTable.find('caption').show()

    this._adjustHorizontalTableScroll()

  _adjustHorizontalTableScroll: ->
    if this.headerTable.hasClass('fixed')
      baseShift          = this.contentTable.offset().left
      # baseShift is initial distance from left viewport to table edge
      pixelsScrolledLeft = $(window).scrollLeft()
      adjustment         = -(pixelsScrolledLeft - baseShift)
      this.headerTable.css({'left' : adjustment })
    else
      # Reset settings if table scrolling is not engaged
      this.headerTable.css({'left' : '' })

  cloneAndAppendTableHeader: ->
    # Original thead becomes invisible and we show this cloned header
    # in a new table on top of the invisible thead
    orig = @contentTable.find('thead')
    origParent = orig.closest('table')
    clone = orig.clone()
    orig.prependTo(@headerTable)
    clone.prependTo(origParent)

    caption      = @contentTable.find('caption')
    captionClone = caption.clone()
    caption.prependTo(@headerTable)
    captionClone.prependTo(origParent)

  hideOriginalThead: ->
    @contentTable.find('thead').addClass('invisible')
    @contentTable.find('caption').addClass('invisible')

  alignTableWidth: ->
    # Ensure width does not change
    @headerTable.width(@currentContentTableWidth())

  currentContentTableWidth: ->
    # width = @fullWidth ?
    #   @container.find('.original_table_container table').parent().width() :
    #   @container.find('.original_table_container table').outerWidth()
    width = if @fullWidth
      @container.find('.original_table_container table').parent().width()
    else
      @container.find('.original_table_container table').outerWidth()
    return width

  setHeaderWidth: ->
    # Set individual widths - may need to expand
    headerTableHeaders = @headerTable.find('thead tr:first-child th')
    contentTableHeaders = @contentTable.find('thead tr:first-child th')

    $.each(headerTableHeaders, (i) ->
      $(@).width(contentTableHeaders.eq(i).width())
      $(@).height(contentTableHeaders.eq(i).height())
    )

  _handleWindowResize: ->
    window.addEventListener 'resize', =>
      this._adjustHorizontalTableScroll()

document.addEventListener('DOMContentLoaded', ->
  $.each($('.scrolling_table_container'), (i, tableContainer) ->
    new TableScrollManager(tableContainer, i).perform()
  )
)
