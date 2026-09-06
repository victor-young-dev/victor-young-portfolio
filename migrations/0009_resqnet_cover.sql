-- Swap ResQNet's work-list preview image for its actual splash-screen branding.
update work_items set image = '/work/resqnet-cover.png' where slug = 'resqnet';
