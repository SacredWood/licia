const uuid = util.uuid;

const d = debug('test');
const d2 = debug('test2');

d('booting %s', 'test');
d2('booting %s', 'test2');
for (let i = 0; i < 100000; i++) uuid();
d('create 100000 uuid');
for (let i = 0; i < 100000; i++) uuid();
d2('create another 100000 uuid');

d.enabled = false;
d('doing lots of uninteresting work');
