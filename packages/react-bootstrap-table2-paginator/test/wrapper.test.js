import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';


import BootstrapTable from 'react-bootstrap-table2/src/bootstrap-table';
import Store from 'react-bootstrap-table2/src/store';
import paginator from '../src';
import wrapperFactory from '../src/wrapper';
import Pagination from '../src/pagination';
import Const from '../src/const';

const data = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i,
    name: `itme name ${i}`
  });
}

describe('Wrapper', () => {
  let PaginationWrapper;
  let wrapper;
  let instance;

  const createTableProps = (props = {}) => {
    const tableProps = {
      keyField: 'id',
      columns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name'
      }],
      data,
      pagination: paginator(props.options),
      store: new Store('id')
    };
    tableProps.store.data = data;
    return tableProps;
  };

  const pureTable = props => (<BootstrapTable { ...props } />);

  const createPaginationWrapper = (props, renderFragment = true) => {
    PaginationWrapper = wrapperFactory(pureTable);
    wrapper = shallow(<PaginationWrapper { ...props } />);
    instance = wrapper.instance();
    if (renderFragment) {
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    }
  };

  describe('default pagination', () => {
    const props = createTableProps();

    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering correctly', () => {
      expect(wrapper.length).toBe(1);
    });

    it('should initializing state correctly', () => {
      expect(instance.state.currPage).toBeDefined();
      expect(instance.state.currPage).toEqual(Const.PAGE_START_INDEX);
      expect(instance.state.currSizePerPage).toBeDefined();
      expect(instance.state.currSizePerPage).toEqual(Const.SIZE_PER_PAGE_LIST[0]);
    });

    it('should rendering BootstraTable correctly', () => {
      const table = wrapper.find(BootstrapTable);
      expect(table.length).toBe(1);
      expect(table.prop('data').length).toEqual(instance.state.currSizePerPage);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('dataSize')).toEqual(props.store.data.length);
      expect(pagination.prop('currPage')).toEqual(instance.state.currPage);
      expect(pagination.prop('currSizePerPage')).toEqual(instance.state.currSizePerPage);
      expect(pagination.prop('onPageChange')).toEqual(instance.handleChangePage);
      expect(pagination.prop('onSizePerPageChange')).toEqual(instance.handleChangeSizePerPage);
      expect(pagination.prop('sizePerPageList')).toEqual(Const.SIZE_PER_PAGE_LIST);
      expect(pagination.prop('paginationSize')).toEqual(Const.PAGINATION_SIZE);
      expect(pagination.prop('pageStartIndex')).toEqual(Const.PAGE_START_INDEX);
      expect(pagination.prop('withFirstAndLast')).toEqual(Const.With_FIRST_AND_LAST);
      expect(pagination.prop('alwaysShowAllBtns')).toEqual(Const.SHOW_ALL_PAGE_BTNS);
      expect(pagination.prop('firstPageText')).toEqual(Const.FIRST_PAGE_TEXT);
      expect(pagination.prop('prePageText')).toEqual(Const.PRE_PAGE_TEXT);
      expect(pagination.prop('nextPageText')).toEqual(Const.NEXT_PAGE_TEXT);
      expect(pagination.prop('lastPageText')).toEqual(Const.LAST_PAGE_TEXT);
      expect(pagination.prop('firstPageTitle')).toEqual(Const.FIRST_PAGE_TITLE);
      expect(pagination.prop('prePageTitle')).toEqual(Const.PRE_PAGE_TITLE);
      expect(pagination.prop('nextPageTitle')).toEqual(Const.NEXT_PAGE_TITLE);
      expect(pagination.prop('lastPageTitle')).toEqual(Const.LAST_PAGE_TITLE);
      expect(pagination.prop('hideSizePerPage')).toEqual(Const.HIDE_SIZE_PER_PAGE);
    });
  });

  describe('when options.page is defined', () => {
    const page = 3;
    const props = createTableProps({ options: { page } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should setting correct state.currPage', () => {
      expect(instance.state.currPage).toEqual(page);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('currPage')).toEqual(page);
    });
  });

  describe('when options.sizePerPage is defined', () => {
    const sizePerPage = 30;
    const props = createTableProps({ options: { sizePerPage } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should setting correct state.currPage', () => {
      expect(instance.state.currSizePerPage).toEqual(sizePerPage);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('currSizePerPage')).toEqual(sizePerPage);
    });
  });

  describe('when options.totalSize is defined', () => {
    const totalSize = 100;
    const props = createTableProps({ options: { totalSize } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('dataSize')).toEqual(totalSize);
    });
  });

  describe('when options.pageStartIndex is defined', () => {
    const pageStartIndex = -1;
    const props = createTableProps({ options: { pageStartIndex } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should setting correct state.currPage', () => {
      expect(instance.state.currPage).toEqual(pageStartIndex);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('pageStartIndex')).toEqual(pageStartIndex);
    });
  });

  describe('when options.sizePerPageList is defined', () => {
    const sizePerPageList = [10, 40];
    const props = createTableProps({ options: { sizePerPageList } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('sizePerPageList')).toEqual(sizePerPageList);
    });
  });

  describe('when options.paginationSize is defined', () => {
    const paginationSize = 10;
    const props = createTableProps({ options: { paginationSize } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('paginationSize')).toEqual(paginationSize);
    });
  });

  describe('when options.withFirstAndLast is defined', () => {
    const withFirstAndLast = false;
    const props = createTableProps({ options: { withFirstAndLast } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('withFirstAndLast')).toEqual(withFirstAndLast);
    });
  });

  describe('when options.alwaysShowAllBtns is defined', () => {
    const alwaysShowAllBtns = true;
    const props = createTableProps({ options: { alwaysShowAllBtns } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('alwaysShowAllBtns')).toEqual(alwaysShowAllBtns);
    });
  });

  describe('when options.firstPageText is defined', () => {
    const firstPageText = '1st';
    const props = createTableProps({ options: { firstPageText } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('firstPageText')).toEqual(firstPageText);
    });
  });

  describe('when options.prePageText is defined', () => {
    const prePageText = 'PRE';
    const props = createTableProps({ options: { prePageText } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('prePageText')).toEqual(prePageText);
    });
  });

  describe('when options.nextPageText is defined', () => {
    const nextPageText = 'NEXT';
    const props = createTableProps({ options: { nextPageText } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('nextPageText')).toEqual(nextPageText);
    });
  });

  describe('when options.lastPageText is defined', () => {
    const lastPageText = 'nth';
    const props = createTableProps({ options: { lastPageText } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('lastPageText')).toEqual(lastPageText);
    });
  });

  describe('when options.firstPageTitle is defined', () => {
    const firstPageTitle = '1st';
    const props = createTableProps({ options: { firstPageTitle } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('firstPageTitle')).toEqual(firstPageTitle);
    });
  });

  describe('when options.prePageTitle is defined', () => {
    const prePageTitle = 'PRE';
    const props = createTableProps({ options: { prePageTitle } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('prePageTitle')).toEqual(prePageTitle);
    });
  });

  describe('when options.nextPageTitle is defined', () => {
    const nextPageTitle = 'NEXT';
    const props = createTableProps({ options: { nextPageTitle } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('nextPageTitle')).toEqual(nextPageTitle);
    });
  });

  describe('when options.lastPageTitle is defined', () => {
    const lastPageTitle = 'nth';
    const props = createTableProps({ options: { lastPageTitle } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('lastPageTitle')).toEqual(lastPageTitle);
    });
  });

  describe('when options.hideSizePerPage is defined', () => {
    const hideSizePerPage = true;
    const props = createTableProps({ options: { hideSizePerPage } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('hideSizePerPage')).toEqual(hideSizePerPage);
    });
  });

  describe('when options.hidePageListOnlyOnePage is defined', () => {
    const hidePageListOnlyOnePage = true;
    const props = createTableProps({ options: { hidePageListOnlyOnePage } });
    beforeEach(() => {
      createPaginationWrapper(props);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('hidePageListOnlyOnePage')).toEqual(hidePageListOnlyOnePage);
    });
  });

  describe('handleChangePage', () => {
    const newPage = 3;
    const props = createTableProps({ options: { onPageChange: sinon.stub() } });
    beforeEach(() => {
      createPaginationWrapper(props, false);
      instance.handleChangePage(newPage);
    });

    afterEach(() => {
      props.pagination.options.onPageChange.reset();
    });

    it('should setting state.currPage correctly', () => {
      expect(instance.state.currPage).toEqual(newPage);
    });

    it('should calling options.onPageChange correctly when it is defined', () => {
      const { onPageChange } = props.pagination.options;
      expect(onPageChange.calledOnce).toBeTruthy();
      expect(onPageChange.calledWith(newPage, instance.state.currSizePerPage)).toBeTruthy();
    });

    describe('when pagination remote is enable', () => {
      beforeEach(() => {
        props.remote = true;
        props.onRemotePageChange = sinon.stub();
        createPaginationWrapper(props, false);
        instance.handleChangePage(newPage);
      });

      it('should not setting state.currPage', () => {
        expect(instance.state.currPage).not.toEqual(newPage);
      });

      it('should calling options.onRemotePageChange correctly', () => {
        expect(props.onRemotePageChange.calledOnce).toBeTruthy();
        expect(props.onRemotePageChange.calledWith(
          newPage, instance.state.currSizePerPage)).toBeTruthy();
      });
    });
  });

  describe('handleChangeSizePerPage', () => {
    const newPage = 2;
    const newSizePerPage = 30;
    const props = createTableProps({ options: { onSizePerPageChange: sinon.stub() } });
    beforeEach(() => {
      createPaginationWrapper(props, false);
      instance.handleChangeSizePerPage(newSizePerPage, newPage);
    });

    afterEach(() => {
      props.pagination.options.onSizePerPageChange.reset();
    });

    it('should setting state.currPage and state.currSizePerPage correctly', () => {
      expect(instance.state.currPage).toEqual(newPage);
      expect(instance.state.currSizePerPage).toEqual(newSizePerPage);
    });

    it('should calling options.onSizePerPageChange correctly when it is defined', () => {
      const { onSizePerPageChange } = props.pagination.options;
      expect(onSizePerPageChange.calledOnce).toBeTruthy();
      expect(onSizePerPageChange.calledWith(newSizePerPage, newPage)).toBeTruthy();
    });

    describe('when pagination remote is enable', () => {
      beforeEach(() => {
        props.remote = true;
        props.onRemotePageChange = sinon.stub();
        createPaginationWrapper(props, false);
        instance.handleChangeSizePerPage(newSizePerPage, newPage);
      });

      it('should not setting state.currPage', () => {
        expect(instance.state.currPage).not.toEqual(newPage);
        expect(instance.state.currSizePerPage).not.toEqual(newSizePerPage);
      });

      it('should calling options.onRemotePageChange correctly', () => {
        expect(props.onRemotePageChange.calledOnce).toBeTruthy();
        expect(props.onRemotePageChange.calledWith(newPage, newSizePerPage)).toBeTruthy();
      });
    });
  });

  describe('isRemote', () => {
    let result;
    describe('when options.remote is true', () => {
      const props = createTableProps();
      props.remote = true;

      beforeEach(() => {
        createPaginationWrapper(props, false);
        result = instance.isRemote();
      });

      it('should return true', () => {
        expect(result).toBeTruthy();
      });
    });

    describe('when options.remote is false', () => {
      const props = createTableProps();
      props.remote = false;

      beforeEach(() => {
        createPaginationWrapper(props, false);
        result = instance.isRemote();
      });

      it('should return false', () => {
        expect(result).toBeFalsy();
      });
    });

    describe('when options.remote.pagination is defined as true', () => {
      const props = createTableProps();
      props.remote = {};
      props.remote.pagination = true;

      beforeEach(() => {
        createPaginationWrapper(props, false);
        result = instance.isRemote();
      });

      it('should return true', () => {
        expect(result).toBeTruthy();
      });
    });

    describe('when options.remote.pagination is defined as false', () => {
      const props = createTableProps();
      props.remote = {};
      props.remote.pagination = false;

      beforeEach(() => {
        createPaginationWrapper(props, false);
        result = instance.isRemote();
      });

      it('should return false', () => {
        expect(result).toBeFalsy();
      });
    });
  });
});