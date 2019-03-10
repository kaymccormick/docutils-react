import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import serializer from 'jest-emotion';

expect.addSnapshotSerializer(serializer);

configure({ adapter: new Adapter() });
