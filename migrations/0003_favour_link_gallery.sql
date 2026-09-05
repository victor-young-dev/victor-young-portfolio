-- Favour Link media gallery. Titles are public labels; FLS codes keep generic assets identifiable.
insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/favour-link-fan-ad.png', null, 'Solar rechargeable fan advert', 0
from work_items where slug = 'favour-link'
and not exists (select 1 from gallery_items where src = '/work/favour-link-fan-ad.png');

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/favour-link-logo.png', null, 'Favour Link logo', 1
from work_items where slug = 'favour-link'
and not exists (select 1 from gallery_items where src = '/work/favour-link-logo.png');

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/favour-link-fls-001.png', null, 'FLS 001', 2
from work_items where slug = 'favour-link'
and not exists (select 1 from gallery_items where src = '/work/favour-link-fls-001.png');

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/favour-link-fls-002.png', null, 'FLS 002', 3
from work_items where slug = 'favour-link'
and not exists (select 1 from gallery_items where src = '/work/favour-link-fls-002.png');

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/favour-link-fls-003.png', null, 'FLS 003', 4
from work_items where slug = 'favour-link'
and not exists (select 1 from gallery_items where src = '/work/favour-link-fls-003.png');

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/favour-link-fans-lineup.png', null, 'Solar and rechargeable fan lineup', 5
from work_items where slug = 'favour-link'
and not exists (select 1 from gallery_items where src = '/work/favour-link-fans-lineup.png');