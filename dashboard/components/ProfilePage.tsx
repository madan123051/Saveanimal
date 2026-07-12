import React, { useEffect, useState } from 'react';
import type { User, Activity } from '../types';

interface ProfilePageProps {
  user: User;
  activities: Activity[];
  onNavigate?: (page: string) => void;
  onUserUpdate?: (user: User) => void;
}

const VerifiedBadge: React.FC<{ verified?: boolean }> = ({ verified }) => (
  verified ? (
    <span className="inline-flex items-center gap-1 rounded-lg bg-[#eef8fc] px-2.5 py-1 text-xs font-black text-[#286c90] border border-[#bed8e6]" title="Verified by SaveAnimal admin">
      <span className="grid h-4 w-4 place-items-center rounded-full bg-[#407b9b] text-[10px] text-white">✓</span>
      Verified
    </span>
  ) : (
    <span className="inline-flex rounded-lg bg-[#f4f8f2] px-2.5 py-1 text-xs font-black text-[#6b756f] border border-[#dfe8e1]">Unverified</span>
  )
);

const fieldClass = 'w-full rounded-lg border border-[#dfe8e1] bg-white px-3 py-2.5 text-sm font-bold text-[#17211d] outline-none focus:border-[#2f8f63] focus:ring-4 focus:ring-[#2f8f63]/10';

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, activities, onNavigate, onUserUpdate }) => {
  const [profile, setProfile] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [skillsText, setSkillsText] = useState((user.skills || []).join(', '));

  useEffect(() => {
    setProfile(user);
    setSkillsText((user.skills || []).join(', '));
  }, [user]);

  const isVolunteer = profile.role === 'volunteer';
  const isAdmin = profile.role === 'admin';
  const initial = (profile.name || 'U').charAt(0).toUpperCase();
  const roleLabel = isAdmin ? 'System Admin' : isVolunteer ? 'Rescue Volunteer' : 'SaveAnimal Supporter';
  const defaultBio = isAdmin
    ? 'Managing SaveAnimal Nepal rescue operations, volunteers, content, user verification, and donation records.'
    : isVolunteer
      ? 'Helping with field rescue, feeding routes, first-aid coordination, and community animal welfare work.'
      : 'Following rescue stories and supporting animal welfare work in Nepal.';
  const bio = profile.bio || defaultBio;
  const shownSkills = profile.skills?.length ? profile.skills : isVolunteer ? ['Animal Care','Rescue Support','Feeding Route'] : isAdmin ? ['User Verification','Donation Records','Rescue Admin'] : ['Supporter','Community'];
  const stats = [
    { label:'Reports Helped', value:isAdmin ? 42 : isVolunteer ? (profile.activities || 8) : 0 },
    { label:'Volunteer Hours', value:isVolunteer ? (profile.hours || 24) : isAdmin ? 120 : 0 },
    { label:'Trust Score', value:profile.verified || isAdmin ? 'High' : 'New' },
  ];

  const updateField = (key: keyof User, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const saveProfile = () => {
    const updated: User = {
      ...profile,
      skills: skillsText.split(',').map((skill) => skill.trim()).filter(Boolean),
      verified: profile.role === 'admin' || profile.verified,
    };
    localStorage.setItem('saveanimal_user', JSON.stringify(updated));
    localStorage.setItem('saveanimal_currentUser', JSON.stringify(updated));
    setProfile(updated);
    onUserUpdate?.(updated);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setProfile(user);
    setSkillsText((user.skills || []).join(', '));
    setIsEditing(false);
  };

  return (
    <div className="min-h-full bg-[#f4f8f2] p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-lg border border-[#dfe8e1] bg-[#fffdf8] shadow-sm">
          <div className="h-40 bg-[linear-gradient(135deg,#174f3f,#2f8f63_58%,#f5b041)] relative">
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)', backgroundSize:'48px 48px' }} />
          </div>
          <div className="px-5 pb-6 md:px-7">
            <div className="-mt-12 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl border-4 border-[#fffdf8] bg-[#174f3f] text-5xl font-black text-white shadow-lg">
                  {profile.photo ? <img src={profile.photo} alt="" className="h-full w-full rounded-xl object-cover" /> : initial}
                </div>
                <div className="pt-12 md:pt-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-black text-[#17211d]">{profile.name}</h1>
                    <VerifiedBadge verified={profile.verified || isAdmin} />
                  </div>
                  <p className="mt-1 font-bold text-[#6b756f]">{roleLabel}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-[#dff3e7] px-3 py-1 text-sm font-black text-[#174f3f]">{profile.role}</span>
                    <span className="rounded-lg bg-[#fff8e8] px-3 py-1 text-sm font-black text-[#8a5d0b]">{profile.location || 'Kathmandu, Nepal'}</span>
                    <span className="rounded-lg bg-[#f4f8f2] px-3 py-1 text-sm font-black text-[#6b756f]">Live Account</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-0 md:pt-10">
                {!isAdmin && (
                  <button onClick={() => onNavigate?.('dashboard')} className="rounded-lg border border-[#dfe8e1] bg-white px-4 py-3 font-black text-[#174f3f]">
                    View Dashboard
                  </button>
                )}
                <button onClick={() => setIsEditing(true)} className="rounded-lg bg-[#174f3f] px-4 py-3 font-black text-white">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {isEditing && (
          <section className="mt-5 rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#17211d]">Edit Profile</h2>
                <p className="text-sm font-bold text-[#6b756f]">Update public profile details shown on your SaveAnimal account.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={cancelEdit} className="rounded-lg border border-[#dfe8e1] bg-white px-4 py-2 font-black text-[#6b756f]">Cancel</button>
                <button onClick={saveProfile} className="rounded-lg bg-[#174f3f] px-4 py-2 font-black text-white">Save</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-black text-[#17211d]">Name<input className={fieldClass} value={profile.name || ''} onChange={(e) => updateField('name', e.target.value)} /></label>
              <label className="grid gap-1 text-sm font-black text-[#17211d]">Email<input className={fieldClass} value={profile.email || ''} onChange={(e) => updateField('email', e.target.value)} /></label>
              <label className="grid gap-1 text-sm font-black text-[#17211d]">Location<input className={fieldClass} value={profile.location || ''} onChange={(e) => updateField('location', e.target.value)} placeholder="Kathmandu, Nepal" /></label>
              <label className="grid gap-1 text-sm font-black text-[#17211d]">Photo URL<input className={fieldClass} value={profile.photo || ''} onChange={(e) => updateField('photo', e.target.value)} placeholder="https://..." /></label>
              <label className="grid gap-1 text-sm font-black text-[#17211d] md:col-span-2">Bio<textarea className={fieldClass} rows={4} value={profile.bio || ''} onChange={(e) => updateField('bio', e.target.value)} placeholder={defaultBio} /></label>
              <label className="grid gap-1 text-sm font-black text-[#17211d] md:col-span-2">Skills, comma separated<input className={fieldClass} value={skillsText} onChange={(e) => setSkillsText(e.target.value)} placeholder="Animal Care, Rescue Support, Feeding Route" /></label>
            </div>
          </section>
        )}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <aside className="space-y-5">
            <div className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
              <h2 className="text-lg font-black text-[#17211d]">About</h2>
              <p className="mt-2 text-sm leading-6 text-[#6b756f]">{bio}</p>
              <div className="mt-4 grid gap-3 text-sm">
                {profile.email && <div><p className="text-xs font-black uppercase tracking-[.12em] text-[#6b756f]">Email</p><p className="font-bold text-[#17211d]">{profile.email}</p></div>}
                <div><p className="text-xs font-black uppercase tracking-[.12em] text-[#6b756f]">Verification</p><p className="font-bold text-[#17211d]">{profile.verified || isAdmin ? 'Admin verified account' : 'Waiting for admin verification'}</p></div>
                <div><p className="text-xs font-black uppercase tracking-[.12em] text-[#6b756f]">Member Since</p><p className="font-bold text-[#17211d]">{profile.joinDate || new Date(profile.loginTime || Date.now()).toLocaleDateString()}</p></div>
              </div>
            </div>

            <div className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
              <h2 className="text-lg font-black text-[#17211d]">Skills & Badges</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {shownSkills.map((skill) => (
                  <span key={skill} className="rounded-lg border border-[#bfe6cd] bg-[#dff3e7] px-3 py-1.5 text-sm font-black text-[#174f3f]">{skill}</span>
                ))}
                {(profile.verified || isAdmin) && <span className="rounded-lg border border-[#bed8e6] bg-[#eef8fc] px-3 py-1.5 text-sm font-black text-[#286c90]">Verified Badge</span>}
              </div>
            </div>
          </aside>

          <main className="space-y-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[.12em] text-[#6b756f]">{s.label}</p>
                  <p className="mt-2 text-3xl font-black text-[#17211d]">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-[#dfe8e1] bg-[#fffdf8] p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-black text-[#17211d]">Activity Timeline</h2>
                <span className="rounded-lg bg-[#f4f8f2] px-3 py-1 text-xs font-black text-[#6b756f]">{activities.length} updates</span>
              </div>
              <div className="mt-4 space-y-3">
                {activities.slice(0, 5).map((activity) => (
                  <article key={activity.id} className="rounded-lg border border-[#dfe8e1] bg-[#f4f8f2] p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black text-[#17211d]">{activity.title}</h3>
                        <p className="mt-1 text-sm text-[#6b756f]">{activity.description}</p>
                      </div>
                      <span className={`rounded-lg px-2 py-1 text-xs font-black ${activity.status === 'Completed' ? 'bg-[#dff3e7] text-[#174f3f]' : 'bg-[#eef8fc] text-[#286c90]'}`}>{activity.status}</span>
                    </div>
                    <p className="mt-3 text-xs font-bold text-[#6b756f]">{activity.date} · {activity.volunteers} volunteers</p>
                  </article>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
